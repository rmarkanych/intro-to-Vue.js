<template>
  <div>
    <div class="flex items-center gap-4">
      <h3 class="font-medium m-0">Contact list</h3>

      <AppButton class="flex items-center" @click="createNewContact">
        <template #icon>
          <IconPlus class="w-5 h-5" />
        </template>
        Create contact
      </AppButton>
    </div>

    <div class="contact-list grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] grid gap-5 my-5">
      <ContactItem
        v-for="(contact) in contacts"
        :key="contact.id"
        class="cursor-pointer"
        :contact="contact"
        @click="editContact(contact.id)"
        @delete="deleteContact(contact)"
        @save="updateContact($event)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useRouter } from 'vue-router'
import { useContactsStore } from '@/store'
import { storeToRefs } from 'pinia'
import ContactItem from '@/components/ContactItem.vue'
import AppButton from '@/components/AppButton.vue'
import IconPlus from '@/components/icons/IconPlus.vue'

const router = useRouter()

const contactsStore = useContactsStore()
const { contacts } = storeToRefs(contactsStore)
const { deleteContact, updateContact } = contactsStore

function createNewContact () {
  router.push({ name: 'upsertContact', params: { contactId: 'new' } })
}

function editContact (contactId: number) {
  router.push({ name: 'upsertContact', params: { contactId } })
}
</script>
