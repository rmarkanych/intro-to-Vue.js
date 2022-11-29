<template>
  <div class="rounded-lg bg-white shadow relative">
    <div class="p-6 pb-2">
      <div class="flex">
        <div class="flex-grow text-sm truncate">
          <template v-if="props.isNew || editMode">
            <input
              ref="inputRef"
              v-model="localContact.name"
              type="text"
              class="block font-medium w-full border border-gray"
              @keyup.esc="onCancel"
              @keyup.enter="onSave"
              @input="validatedInput"
            >
            <input
              v-model="localContact.description"
              type="text"
              class="block mt-1 text-gray w-full border border-gray"
              @input="validatedInput"
              @keyup.esc="onCancel"
              @keyup.enter="onSave"
            >
          </template>

          <template v-else>
            <p class="font-medium">{{ contact.name }}</p>
            <p class="text-gray mt-1 truncate">
              {{ contact.description }}
            </p>
          </template>
        </div>
        <img
          class="w-[40px] h-[40px] object-cover ml-2 rounded-full shrink-0"
          :src="contact.image? contact.image : 'https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2873&q=80' " alt="contact-logo"
        >
      </div>
      <div class="flex justify-end mt-2 gap-2">
        <template v-if="props.isNew || editMode">
          <span
            class="text-blue-500 font-medium text-xs cursor-pointer hover:underline"

            @click="onCancel"
          >Cancel</span>

          <button
            ref="buttonRef"
            class="text-blue-500 font-medium text-xs cursor-pointer hover:underline"
            @click="props.isNew? onCreate() : onSave()"
          >
            {{ props.isNew ? 'Create' : 'Save' }}
          </button>
        </template>

        <template v-else>
          <span
            class="text-blue-500 font-medium text-xs cursor-pointer hover:underline"
            @click="triggerEditMode"
          >Edit</span>

          <span
            class="text-red-500 font-medium text-xs cursor-pointer hover:underline"
            @click="$emit('delete')"
          >Delete</span>
        </template>
      </div>
    </div>

    <div class="flex text-sm font-medium text-gray-dark border-t border-gray-ultra-light">
      <div class="flex items-center justify-center flex-1 py-4 cursor-pointer hover:text-gray">
        <IconEnvelope />
        <span class="ml-3">Email</span>
      </div>
      <div
        class="flex items-center justify-center flex-1 py-4 border-l
            border-gray-ultra-light cursor-pointer hover:text-gray"
      >
        <IconPhone />
        <span class="ml-3">Call</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, onMounted } from 'vue'
import type { IContact } from '@/types'
import IconEnvelope from '@/components/icons/IconEnvelope.vue'
import IconPhone from '@/components/icons/IconPhone.vue'

const props = defineProps<{
  contact: IContact
  isNew?: boolean
}>()

const emit = defineEmits(['delete', 'save', 'create', 'cancel'])

const inputRef = ref<HTMLInputElement>()

const buttonRef = ref<HTMLButtonElement>()

const localContact = ref<Omit<IContact, 'id'>>({
  name: '',
  description: '',
  image: ''
})
onMounted(() => {
  if (props.isNew || editMode) {
    validatedInput()
  }
})
const editMode = ref(false)

async function triggerEditMode () {
  editMode.value = true
  localContact.value = { ...props.contact }
  await nextTick()
  validatedInput()
  inputRef.value?.focus()
}

function onSave () {
  emit('save', localContact.value)
  editMode.value = false
}

function onCreate () {
  emit('create', localContact.value)
}

function onCancel () {
  emit('cancel')
  editMode.value = false
}

function validatedInput () {
  if (!buttonRef.value) return

  if (localContact.value.name.trim() === '' || localContact.value.description.trim() === '') {
    buttonRef.value.setAttribute('disabled', '0')
    buttonRef.value.style.color = 'gray'
  } else {
    buttonRef.value.removeAttribute('disabled')
    buttonRef.value.style.color = '#3682F6'
  }
}
</script>
