<template>
  <div>
    <h3 class="mb-2">Gob Opening</h3>
    <div>
      <el-select
        v-model="selectedDepartments" multiple class="w-[300px]"
        collapse-tags collapse-tags-tooltip filterable
        placeholder="Select departments"
      >
        <el-option v-for="hash in hashed" :key="hash.id" :value="hash.department" />
      </el-select>
    </div>
    <div v-for="element in hashed" :key="element.department">
      <p class="font-semibold text-green-700 mt-2">{{ element.department }}</p>
      <ul>
        <li v-for="job in element.jobs" :key="job.id">
          <a :href="job.url" class="cursor-pointer hover:text-gray" target="_blank">
            🟢 - {{ job.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { jobOpenings } from '@/_homework/job-openings'
import { departments } from '@/_homework/departments'

const selectedDepartments = ref<[]>([])

const hashed = computed(() => {
  const res = departments.reduce((acc, curr) => {
    acc[curr.value] = {
      department: curr.name,
      jobs: jobOpenings.filter(job => job.departments.some(r => curr.value.includes(r)))
    }
    return acc
  }, {} as any)
  // const filteredArr = []
  res.others = {
    department: 'Others',
    jobs: jobOpenings.filter(job => job.departments.length < 1)
  }
  for (const dep in res) {
    if (!res[dep].jobs.length) {
      delete res[dep]
    }
  }
  // for (const item of Object.values(res)) {
  //   console.log(Object.values(item))
  //   if (selectedDepartments.value.includes(item.department)) {
  //     // ==========//
  //   }
  // }
  // console.log(filteredArr)

  // if (selectedDepartments.value.length) {
  //   res.filter(e => console.log(e))
  // }
  return res
})
console.log(hashed.value)
</script>
