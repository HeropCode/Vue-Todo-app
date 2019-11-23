<template>
  <div>
    <input
      v-model="title"
      :placeholder="placeholder"
      type="text"
      @keypress.enter="createTodo"
    />
    <button @click="createTodo">
      추가
    </button>
  </div>
</template>

<script>
export default {
  name: 'TodoCreator',
  data () {
    return {
      title: '',
      placeholder: '할 일을 추가하세요!'
    }
  },
  methods: {
    createTodo () {
      console.log('CreateTodo!!!!')
      // `title`의 유효성 검사
      const validatedTitle = this.title && this.title.trim()
      if (!validatedTitle) {
        alert('유효하지 않은 제목입니다.')
        this.title = this.title.trim()
        return
      }

      this.$emit('create-todo', this.title)
      // `title` 초기화
      this.title = ''
    }
  }
}
</script>
