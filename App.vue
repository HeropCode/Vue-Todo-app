<template>
  <div>
    <!-- HOME BUTTON -->
    <router-link
      to="/"
      class="to-home"
    >
      <i class="material-icons">home</i>
    </router-link>

    <!-- VIEWS -->
    <router-view />
  </div>
</template>

<style scoped>
  .to-home.router-link-exact-active {
    display: none;
  }
</style>
