<template>
  <div class="todo-app">

    <!-- FILTERS -->
    <div class="todo-app__filters">
      <button
        :class="{ active: filter === 'all' }"
        @click="changeFilter('all')"
      >
        모든 항목 ({{ todos.length }})
      </button>
      <button
        :class="{ active: filter === 'active' }"
        @click="changeFilter('active')"
      >
        해야 할 항목 ({{ activeCount }})
      </button>
      <button
        :class="{ active: filter === 'completed' }"
        @click="changeFilter('completed')"
      >
        완료된 항목 ({{ completedCount }})
      </button>
    </div>

    <hr />

    <!-- ACTIONS -->
    <div class="todo-app__actions">
      <input
        v-model="allDone"
        type="checkbox"
      />
      <button @click="clearCompleted">완료된 항목 삭제</button>
    </div>

    <hr />

    <!-- LIST -->
    <div class="todo-app__list">
      <todo-item
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @update-todo="updateTodo"
        @delete-todo="deleteTodo"
      />
    </div>

    <hr />

    <!-- INSERT -->
    <todo-creator @create-todo="createTodo" />

  </div>
</template>

<script>
import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import cryptoRandomString from 'crypto-random-string'
import _ from 'lodash'

import TodoCreator from './TodoCreator'
import TodoItem from './TodoItem'

export default {
  name: 'TodoApp',
  components: {
    TodoCreator,
    TodoItem
  },
  data () {
    return {
      db: null,
      todos: [],
      filter: 'all'
    }
  },
  computed: {
    filteredTodos () {
      switch (this.filter) {
        case 'all':
        default:
          return this.todos
        case 'active':
          return this.todos.filter(todo => !todo.done)
        case 'completed':
          return this.todos.filter(todo => todo.done)
      }
    },
    activeCount () {
      return this.todos.filter(todo => !todo.done).length
    },
    completedCount () {
      return this.todos.length - this.activeCount
    },
    allDone: {
      get () {
        return this.todos.length === this.completedCount
      },
      set (checked) {
        this.completeAll(checked)
      }
    }
  },
  created () {
    this.initDB()
  },
  methods: {
    initDB () {
      const adapter = new LocalStorage('todo-app') // DB name
      this.db = low(adapter)

      const hasTodos = this.db
        .has('todos') // Collection name
        .value()

      // 기존에 저장된 DB가 있는지 확인
      if (hasTodos) {
        // 깊은 배열 복사, `this.todos`를 수정할 때 `this.db.getState().todos`를 직접 참조하는 문제를 방지할 수 있습니다.
        this.todos = _.cloneDeep(this.db.getState().todos)
      } else {
        // Local DB 초기화
        this.db
          .defaults({
            todos: []
          })
          .write()
      }
    },
    createTodo (title) {
      const newTodo = {
        id: cryptoRandomString({ length: 10 }),
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
        done: false
      }

      try {
        // DB에 저장
        this.db
          .get('todos')
          .push(newTodo)
          .write() // `todos` 배열을 반환합니다.
      } catch (error) {
        console.error(error)
        return
      }

      // 로컬(local)에 반영
      this.todos.push(_.assign({}, newTodo))
    },
    updateTodo (todo, value) {
      let updatedTodo

      try {
        // DB에 저장
        updatedTodo = this.db
          .get('todos')
          .find({ id: todo.id })
          .assign(value)
          .write() // 수정된 `todo` 객체를 반환합니다.
      } catch (error) {
        console.error(error)
        return
      }

      // 로컬(local)에 반영

      // for (let i = 0; i < this.todos.length; i += 1) {
      //   if (this.todos[i].id === todo.id) {
      //     this.todos[i] = updatedTodo
      //     break // 반복 중단
      //   }
      // }

      // Lodash 라이브러리 활용
      const foundTodo = _.find(this.todos, { id: todo.id })
      _.assign(foundTodo, updatedTodo)
    },
    deleteTodo (todo) {
      try {
        // DB에 저장
        this.db
          .get('todos')
          .remove({ id: todo.id })
          .write()
      } catch (error) {
        console.log(error)
        return
      }

      // 로컬(local)에 반영
      // Lodash 라이브러리 활용
      const foundIndex = _.findIndex(this.todos, { id: todo.id })
      this.$delete(this.todos, foundIndex)
    },
    completeAll (checked) {
      const newTodos = this.db
        .get('todos')
        .forEach(todo => {
          todo.done = checked
        })
        .write() // 수정된 `todos` 배열을 반환합니다.

      this.todos = _.cloneDeep(newTodos)
    },
    clearCompleted () {
      // 배열의 앞에서부터 제거할 경우 배열 순서가 밀리며 문제가 발생!
      // this.todos.forEach(todo => {
      //   if (todo.done) {
      //     this.deleteTodo(todo)
      //   }
      // })

      // 배열의 뒤에서부터 제거.
      // this.todos
      //   .reduce((list, todo, index) => {
      //     if (todo.done) {
      //       list.push(index)
      //     }
      //     return list
      //   }, [])
      //   .reverse()
      //   .forEach(index => {
      //     this.deleteTodo(this.todos[index])
      //   })

      // Lodash 라이브러리 활용
      _.forEachRight(this.todos, todo => {
        if (todo.done) {
          this.deleteTodo(todo)
        }
      })
    },
    changeFilter (filter) {
      this.filter = filter
    }
  }
}
</script>

<style lang="scss">
  button.active {
    font-weight: 900;
  }
</style>
