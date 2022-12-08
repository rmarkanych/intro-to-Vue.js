<template>
  <div>
    <h3>Gob Opening</h3>
    <div>
      <select v-model="selectedDepartments" multiple class="w-[300px]">
        <option v-for="hash in hashed" :key="hash.id">
          {{ hash.department }}
        </option>/>
      </select>
      <hr class="w-[300px]">
    </div>
    <div v-for="dep in hashed" :key="dep.department">
      <p class=" text-green-500">{{ dep.department }}</p>
      <div v-for="job in dep.jobs" :key="job.id">
        🟢 - {{ job.title }}
      </div>
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

  res.others = {
    department: 'Others',
    jobs: jobOpenings.filter(job => job.departments.length < 1)
  }
  for (const dep in res) {
    if (!res[dep].jobs.length) {
      delete res[dep]
    }
  }
  // if (selectedDepartments.value.length) {
  //   res.filter(e => console.log(e))
  // }
  return res
})
console.log(hashed.value)
</script>
