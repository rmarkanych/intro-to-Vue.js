<template>
  <Card>
    <div class="flex">
      <div class="flex-grow text-sm truncate" @click.stop>
        <template v-if="editMode">
          <el-input
            ref="inputRef"
            v-model="localContact.name"
            type="text"
            class="block font-medium w-full"
          />
          <el-input
            v-model="localContact.description"
            type="text" class="block mt-1 text-gray w-full"
          />
        </template>

        <template v-else>
          <p class="font-medium cursor-text">{{ contact.name }}</p>
          <p class="text-gray cursor-text mt-1 truncate">
            {{ contact.description }}
          </p>
        </template>
      </div>

      <div
        class="flex items-center justify-center w-[40px] h-[40px] ml-2 rounded-full shrink-0 overflow-hidden
      border border-gray-medium bg-gray-ultra-light"
      >
        <span
          v-if="imageHasError || !contact.image"
          class="font-medium uppercase"
        >{{ nameAbbrv }}
        </span>

        <img
          v-else
          class="object-cover"
          :src="contact.image"
          alt="contact-logo"
          @error="imageHasError = true"
          @load="imageHasError = false"
        >
      </div>
    </div>

    <div class="flex justify-end mt-2">
      <template v-if="editMode">
        <el-button
          :type="$elComponentType.primary"
          :size="$elComponentSize.small"
          class="text-blue-500 font-medium text-xs cursor-pointer"
          @click.stop="editMode = false"
        >
          Cancel
        </el-button>

        <el-button
          :type="$elComponentType.primary"
          :size="$elComponentSize.small"
          class="text-blue-500 font-medium text-xs cursor-pointer "
          @click.stop="onSave"
        >
          Save
        </el-button>
      </template>

      <template v-else>
        <el-button
          :type="$elComponentType.primary"
          :size="$elComponentSize.small"
          class="text-blue-500 font-medium text-xs cursor-pointer "
          @click.stop="triggerEditMode"
        >
          Edit
        </el-button>

        <el-button
          :type="$elComponentType.danger"
          :size="$elComponentSize.small"
          class="text-red-500 font-medium text-xs cursor-pointer "
          @click.stop="$emit('delete', contact)"
        >
          Delete
        </el-button>
      </template>
    </div>

    <template #footer>
      <div class="flex text-sm font-medium text-gray-dark border-t border-gray-ultra-light" @click.stop>
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
    </template>
  </Card>
</template>

<script lang="ts" setup>
const props = defineProps<{
  contact: IContact
}>()

const emit = defineEmits(['delete', 'save'])

const inputRef = ref<HTMLInputElement>()

const localContact = ref<Omit<IContact, 'id'>>({
  name: '',
  description: '',
  image: ''
})

const nameAbbrv = computed(() => {
  return props.contact.name.split(' ').reduce((acc, cur) => {
    if (acc.length < 2) {
      acc = acc.concat(cur[0])
    }
    return acc
  }, '')
})

const editMode = ref(false)

async function triggerEditMode () {
  editMode.value = true
  localContact.value = { ...props.contact }
  await nextTick()
  inputRef.value?.focus()
}

function onSave () {
  emit('save', localContact.value)
  editMode.value = false
}

const imageHasError = ref(false)
</script>
