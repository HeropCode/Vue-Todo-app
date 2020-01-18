<template>
  <div
    :class="{ done }"
    class="todo-item"
  >
    <!-- EDIT -->
    <div
      v-if="isEditMode"
      class="item__inner item--edit"
    >
      <input
        ref="titleInput"
        :value="editedTitle"
        type="text"
        @input="editedTitle = $event.target.value"
        @keydown.enter="editedTodo"
        @keydown.esc="offEditMode"
      />
      <div class="item__actions">
        <button
          class="btn btn--primary"
          key="complete"
          @click="editedTodo"
        >
          <i class="material-icons">done</i>
        </button>
        <button
          class="btn"
          key="cancel"
          @click="offEditMode"
        >
          <i class="material-icons">clear</i>
        </button>
      </div>
    </div>

    <!-- NORMAL -->
    <div
      v-else
      class="item__inner item--normal"
    >
      <label>
        <input
          v-model="done"
          type="checkbox"
        />
        <span class="icon"><i class="material-icons">check</i></span>
      </label>
      <div class="item__title-wrap">
        <div
          class="item__title"
          @dblclick="onEditMode">{{ todo.title }}</div>
        <div class="item__date">
          {{ date }}
        </div>
      </div>
      <div class="item__actions">
        <button
          class="btn"
          key="update"
          @click="onEditMode"
        >
          <i class="material-icons">edit</i>
        </button>
        <button
          class="btn btn--danger"
          key="delete"
          @click="deleteTodo"
        >
          <i class="material-icons">delete</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

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
    done: {
      get () {
        return this.todo.done
      },
      set (done) {
        this.updateTodo({
          done
        })
      }
    },
    date () {
      const date = dayjs(this.todo.createdAt)
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
      this.$store.dispatch('todoApp/updateTodo', {
        todo: this.todo,
        value
      })
    },
    deleteTodo () {
      this.$store.dispatch('todoApp/deleteTodo', this.todo)
    }
  }
}
</script>
