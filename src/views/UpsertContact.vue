<template>
  <div class="flex justify-center">
    <Card :title="cardTitle" class="w-[350px]">
      <div class="space-y-4">
        <AppInput v-model="contactForm.name" placeholder="Name" />

        <AppInput v-model="contactForm.description" placeholder="Description" />

        <AppInput v-model="contactForm.image" placeholder="Image link" />
      </div>

      <template #footer>
        <div class="flex gap-3 px-6 pb-4 mt-2">
          <AppButton class="flex-auto " @click="$router.back">
            Cancel
          </AppButton>
          <AppButton v-if="currenContact" class="flex-auto " @click="onDelete">
            Delete
          </AppButton>
          <AppButton :disabled="!isFormValid" class="flex-auto " @click="onSave">
            <template #icon>
              <IconPlus class="w-5 h-5" />
            </template>
            Save
          </AppButton>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import Card from '@/components/Card.vue'
import { storeToRefs } from 'pinia'
import { reactive, computed } from 'vue'
import { useContactsStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import type { IContact } from '@/types'

const router = useRouter()
const route = useRoute()

const currenContact = computed(() => contacts.value.find(c => c.id === +route.params.contactId))

const contactsStore = useContactsStore()
const { contacts } = storeToRefs(contactsStore)
const { addContact, deleteContact, updateContact } = contactsStore

const cardTitle = computed(() => {
  return currenContact.value ? 'Edit Contact' : 'New contact'
})

const contactForm = reactive<IContact>(currenContact.value
  ? { ...currenContact.value }
  : {
    id: contacts.value.length + 1,
    name: '',
    description: '',
    image: ''
  })

const isFormValid = computed(() => {
  const { id, image, ...contact } = contactForm
  return Object.values(contact).every(c => !!c)
})

function onSave () {
  if (currenContact.value) {
    updateContact(contactForm)
  } else {
    addContact(contactForm)
  }

  router.push({ name: 'contacts' })
}

function onDelete () {
  deleteContact(contactForm)
  router.replace({ name: 'contacts' })
}
</script>
