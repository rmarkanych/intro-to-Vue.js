<template>
  <div>
    <h3 class="text-gray mb-3">JOB OPENINGS</h3>
    <p class="text-red-400 text-sm">*press cmd or ctrl to choose more than one category</p>
    <div class="mb-4">
      <select
        v-model="selectedDepartmetns"
        multiple
        class="w-[400px]"
      >
        <option
          v-for="department in allDepartments"
          :key="department.value"
          class="text-gray cursor-pointer font-bold "
        >
          {{ department.name }}
        </option>
      </select>
    </div>
    <p>
      Showing
      <span
        v-if="selectedDepartmetns"
      >
        {{ numberOfShowedJobs }} out of
      </span>
      1458 job openings
    </p>
    <div />
    <div
      v-for="(jobDepartment, index) in filterJobOpenings"
      :key="index"
      class="shadow w-[400px] bg-white rounded"
    >
      <div
        v-if="jobDepartment.length"
        class="my-5 px-3 py-2"
      >
        <p
          class=" font-bold mb-1"
        >
          {{ jobDepartment.department }} ({{ jobDepartment.length }})
        </p>

        <DepartmentCard :jobDepartment="jobDepartment" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { jobOpenings, type IJobOpening } from '@/_homework/job-openings'
import { departments } from '@/_homework/departments'
import DepartmentCard from './components/Card.vue'

const selectedDepartmetns = ref<[]>([])

const transformedArray = computed(() => {
  const otherArr = []
  for (let i = 0; i < jobOpenings.length; i++) {
    if (jobOpenings[i].departments.length < 1) {
      otherArr.push(jobOpenings[i])
    }
  }
  const otherObj = {
    department: 'Other',
    jobOpenings: otherArr,
    length: otherArr.length
  }

  const jobsWithDep = departments.map(el => [el.name,
    jobOpenings.filter(job => job.departments.some(r => el.value.includes(r)))]).map(x => ({
    department: x[0] as string,
    jobOpenings: x[1] as IJobOpening[],
    length: x[1].length as number
  }))
  return [...jobsWithDep, otherObj]
})

const allDepartments = computed(() => {
  const allDepArr = []
  const allDepObjArr = transformedArray.value.filter(el => {
    if (el.jobOpenings.length > 0) {
      return el.department
    }
  }).map(el => el.department)
  for (let i = 0; i < allDepObjArr.length; i++) {
    allDepArr.push({
      name: allDepObjArr[i],
      value: allDepObjArr[i].toLowerCase()
    })
  }
  return allDepArr
})

const filterJobOpenings = computed(() => {
  if (selectedDepartmetns.value.length <= 0) {
    return transformedArray.value
  } else {
    return transformedArray.value.filter(job => selectedDepartmetns.value.some(r => job.department.includes(r)))
  }
})

const numberOfShowedJobs = computed(() => {
  let numberOfJobs = 0
  for (let i = 0; i < filterJobOpenings.value.length; i++) {
    filterJobOpenings.value[i].jobOpenings.forEach(() => numberOfJobs++)
  }
  return numberOfJobs
})
</script>
