<template>
  <div>
    <h3>Gob Opening</h3>
    <div>
      <select multiple class="w-[300px]">
        <option v-for="hash in hashed" :key="hash.url">
          {{ hash }}
        </option>/>
      </select>
      <p>Showing <span> 82</span> out of 1092 job opening</p>
      <hr class="w-[300px]">
    </div>
  </div>
</template>
<script lang="ts" setup>
import { jobOpenings } from '@/_homework/job-openings'
import { departments } from '@/_homework/departments'

const hashed = computed(() => {
  const resArr = []
  departments.forEach(e => {
    jobOpenings.forEach(i => {
      if (i.departments.length && i.departments.includes(e.value)) {
        resArr.push({ [e.name]: { title: i.title, url: i.url } })
      }
    })
  })
  console.log(resArr)
  return resArr
})
console.log(hashed.value[0])

// ([{ [e.name]: { ...i } }])
// [{departmens.name:
// {job.opening.title: '',
// job.opening.id: '',
// job.opening.url: '' } }]

// const hashed = computed (() => {
//   jobOpenings.reduce((acc, curr) {

// const key = curr.name
// if (departments[key]) {
//   curr.departments = departments[key];
// } else {
//   curr.departments = 0;
// }

// acc.push(curr);

// return acc;
// }, []);
// })
</script>
//
//
//
//

<!-- jobOpenings.reduce((acc, curr) => {
  if (!curr.departments.length) {
    [{acc[departments.name]:{} }]
  }
  return acc
}, []) -->
