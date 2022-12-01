<template>
  <div class="flex items-center gap-4">
    <h3 class="font-medium m-0">Contact list</h3>

    <AppButton @click="createNewContact">
      <template #icon>
        <IconPlus class="w-5 h-5" />
      </template>
      Add Contact
    </AppButton>
  </div>

  <div class="grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] grid gap-5 my-5">
    <AppInput v-model.trim="searchedField" placeholder="Enter a name or description" />
    <select
      v-model="selectedRole"
      class="rounded-md font-medium border border-gray-medium focus:border-gray-dark text-sm p-2 text-gray-medium "
      @change="filteredContactsByRole"
    >
      <option value selected> Сhoose a role </option>

      <option
        v-for="contact in contacts"
        :key="contact.id"
      >
        {{ contact.role }}
      </option>
    </select>
    <div class="flex justify-between">
      <AppButton @click="sortedContactsByAscending">
        <template #icon>
          ⬆
        </template>
        Accending
      </AppButton>

      <AppButton @click="sortedContactsByDefault">
        <template #icon>
          𝌏
        </template>
        Default
      </AppButton>

      <AppButton @click="sortedContactsByDescending">
        <template #icon>
          ⬇
        </template>
        Descending
      </AppButton>
    </div>
  </div>

  <div class="grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] grid gap-5 my-5">
    <ContactItem
      v-for="contact in filteredContacts || contacts"
      :key="contact.id"
      class="cursor-pointer"
      :contact="contact"
      @click="editContact(contact.id)"
      @delete="deleteContact"
      @save="updateContact"
    />
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useContactsStore } from '@/store'
import { ref, watch } from 'vue'
import ContactItem from '@/components/ContactItem.vue'
import AppButton from '@/components/AppButton.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import AppInput from '@/components/AppInput.vue'

const router = useRouter()

const contactsStore = useContactsStore()
const { contacts } = storeToRefs(contactsStore)
const { updateContact, deleteContact } = contactsStore

const searchedField = ref('')
const filteredContacts = ref()
const selectedRole = ref('')

function createNewContact () {
  router.push({ name: 'upsertContact', params: { contactId: 'new' } })
}

function editContact (contactId: number) {
  router.push({ name: 'upsertContact', params: { contactId } })
}

function searchedContact () {
  filteredContacts.value = contacts.value.filter(c => {
    return c.name.toLowerCase().includes(searchedField.value.toLowerCase()) ||
      c.description.toLowerCase().includes(searchedField.value.toLowerCase())
  })
}

function filteredContactsByRole () {
  filteredContacts.value = contacts.value.filter(c => c.role?.includes(selectedRole.value))
}

function sortedContactsByAscending () {
  filteredContacts.value = [...contacts.value].sort((a, b) => a.name.localeCompare(b.name))
}

function sortedContactsByDefault () {
  filteredContacts.value = [...contacts.value].sort((a, b) => a.id - b.id)
}

function sortedContactsByDescending () {
  filteredContacts.value = [...contacts.value].sort((a, b) => b.name.localeCompare(a.name))
}

watch(searchedField, () => {
  searchedContact()
})

watch(selectedRole, () => {
  filteredContactsByRole()
})

</script>
