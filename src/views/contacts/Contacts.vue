<template>
  <div class="flex items-center gap-4">
    <h3 class="font-medium m-0">Contact list</h3>

    <el-button :type="$elComponentType.primary" @click="createNewContact">
      <template #icon>
        <IconPlus class="w-5 h-5" />
      </template>
      Add Contact
    </el-button>

    <el-button
      class="!ml-0"
      :type="$elComponentType.danger"
      @click="$router.replace({ name: $routeNames.login })"
    >
      Logout
    </el-button>
  </div>

  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="List" name="first">
      <div class="grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] grid gap-5 my-5">
        <ContactItem
          v-for="contact in contacts"
          :key="contact.id"
          class="cursor-pointer"
          :contact="contact"
          @click="editContact(contact.id)"
          @delete="deleteContact"
          @save="updateContact"
        />
      </div>
    </el-tab-pane>

    <el-tab-pane label="Table" name="second">
      <el-table :data="contacts" style="width: 100%" prop="contacts">
        <el-table-column label="image" width="100">
          <template #default="scope">
            <el-image class="rounded-full" style="height: 76px; width: 76px" :src="scope.row.image ? scope.row.image : 'https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2873&q=80'" />
          </template>
        </el-table-column>
        <el-table-column label="name" width="200" prop="name" />
        <el-table-column label="description" prop="description" />
        <el-table-column fixed="right" label="action" width="200">
          <template #default="scope">
            <el-button
              :type="$elComponentType.primary"
              :size="$elComponentSize.small" @click="updateContact(scope.row)"
            >
              Edit
            </el-button>
            <el-button
              :type="$elComponentType.danger"
              :size="$elComponentSize.small"
              @click="deleteContact(scope.row)"
            >
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>

import type { TabsPaneContext } from 'element-plus'

const router = useRouter()
const { $routeNames } = useGlobalProperties()

const contactsStore = useContactsStore()
const { contacts } = storeToRefs(contactsStore)
const { updateContact, deleteContact } = contactsStore

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

function createNewContact () {
  router.push({ name: $routeNames.upsertContact, params: { contactId: 'new' } })
}

function editContact (contactId: number) {
  router.push({ name: $routeNames.upsertContact, params: { contactId } })
}
</script>
