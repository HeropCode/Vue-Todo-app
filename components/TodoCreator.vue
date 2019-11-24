<template>
  <div>
    <button>
      추가
    </button>
    <input
      :value="title"
      :placeholder="placeholder"
      type="text"
      @input="title = $event.target.value"
      @keypress.enter="createTodo"
    />
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
