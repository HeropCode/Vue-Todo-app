<template>
  <section class="home">
    <div>
      <h1>
        HEROPY's Home page!
      </h1>
      <h2 @click="$router.push('/about')">
        About
      </h2>
      <h2 @click="$router.push('/todos')">
        Todo App
      </h2>
    </div>
  </section>
</template>
