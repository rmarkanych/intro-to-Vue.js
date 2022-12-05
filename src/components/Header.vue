<template>
  <div class="flex space-x-10 pb-4">
    <RouterLink class="nav-link" :to="{name: $routeNames.contacts}">Contacts</RouterLink>
    <RouterLink class="nav-link" :to="{name: $routeNames.jobOpenings}">Job Openings</RouterLink>
  </div>
</template>
<style lang="scss">

a.nav-link {
  padding: 4px;
}

a.router-link-active {
  background-color: #bbb;
  color: #fff;
  border-radius: 0.25rem;
}
</style>
