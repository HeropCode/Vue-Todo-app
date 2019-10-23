<template>
  <div class="todo-app">
    <input
      v-model="todoTitle"
      type="text"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      todoTitle: ''
    }
  }
}
</script>
