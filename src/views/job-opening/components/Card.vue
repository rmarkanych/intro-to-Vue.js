<template>
  <div
    v-for="job in showMore ? jobDepartment.jobOpenings : jobDepartment.jobOpenings.slice(0, 5)"
    :key="job.id"
  >
    <a :href="job.url" target="_blank">
      <p
        class=" text-[13px] cursor-pointer"
      >
        🟢 {{ job.title }}
      </p>
    </a>
  </div>
  <div class="flex justify-center mt-1">
    <AppButton
      v-if="(!showMore && jobDepartment.length>5)"
      class=" pl-1 py-1  pr-3 "
      @click="toggleShowMore"
    >
      See more
    </AppButton>

    <AppButton
      v-if="(showMore && jobDepartment.length>5)"
      class=" pl-1 py-1  pr-3 "
      @click="toggleShowMore"
    >
      See less
    </AppButton>
  </div>
</template>
<script lang="ts" setup>
import type { IJobOpening } from '@/_homework/job-openings'
const showMore = ref(false)
function toggleShowMore () {
  showMore.value = !showMore.value
}
defineProps<{
  jobDepartment: {
    department: string
    jobOpenings: IJobOpening[]
    length: number
  }
}>()
</script>
