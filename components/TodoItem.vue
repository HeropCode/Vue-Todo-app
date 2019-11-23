<template>
  <div
    :title="date"
    class="todo-item"
  >
    <div
      v-if="isEditMode"
      class="item--edit"
    >
      <input
        ref="titleInput"
        v-model="editedTitle"
        type="text"
        @keypress.enter="editedTodo"
        @keypress.esc="offEditMode"
        @blur="offEditMode"
      />
      <button @click="offEditMode">
        취소
      </button>
      <button @click="editedTodo">
        완료
      </button>
    </div>
    <div
      v-else
      class="item--normal"
    >
      <input
        v-model="todo.done"
        type="checkbox"
        @change="updateTodo({ done: todo.done })"
      />
      <span
        :class="{ done: todo.done }"
        class="item__title"
        @dblclick="onEditMode">{{ todo.title }}</span>
      <button @click="onEditMode">
        수정
      </button>
      <button @click="deleteTodo">
        삭제
      </button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'TodoItem',
  props: {
    todo: Object
  },
  data () {
    return {
      isEditMode: false,
      editedTitle: this.todo.title
    }
  },
  computed: {
    date () {
      const date = moment(this.todo.createdAt)
      const isSame = date.isSame(this.todo.updatedAt)
      if (isSame) {
        return date.format('YYYY년 MM월 DD일')
      } else {
        return `${date.format('YYYY년 MM월 DD일')} (edited)`
      }
    }
  },
  methods: {
    onEditMode () {
      this.editedTitle = this.todo.title
      this.isEditMode = true
      // Vue.js가 데이터 변경 후 DOM 업데이트를 마칠 때까지 기다림.
      this.$nextTick(() => {
        this.$refs.titleInput.focus()
      })
    },
    offEditMode () {
      this.isEditMode = false
    },
    editedTodo () {
      // 수정한 내용이 있는 경우만 저장!
      if (this.todo.title !== this.editedTitle) {
        this.updateTodo({
          title: this.editedTitle,
          updatedAt: new Date()
        })
      }
      // 수정 모드 종료.
      this.offEditMode()
    },
    updateTodo (value) {
      this.$emit('update-todo', this.todo, value)
    },
    deleteTodo () {
      this.$emit('delete-todo', this.todo)
    }
  }
}
</script>

<style lang="scss">
  .done {
    text-decoration: line-through;
  }
</style>
