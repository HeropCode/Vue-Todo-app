// import Vue from 'vue'
import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import cryptoRandomString from 'crypto-random-string'
import _find from 'lodash/find'
import _findIndex from 'lodash/findIndex'
import _assign from 'lodash/assign'
import _cloneDeep from 'lodash/cloneDeep'
import _forEachRight from 'lodash/forEachRight'

// data 같은. (computed에 바인딩)
const state = () => ({
  db: null,
  todos: [],
  filter: 'all'
})

// computed 같은. (computed에 바인딩)
const getters = {
  filteredTodos (state) {
    switch (state.filter) {
      case 'all':
      default:
        return state.todos
      case 'active':
        return state.todos.filter(todo => !todo.done)
      case 'completed':
        return state.todos.filter(todo => todo.done)
    }
  },
  total (state) {
    return state.todos.length
  },
  activeCount (state) {
    return state.todos.filter(todo => !todo.done).length
  },
  completedCount (state, getters) {
    return getters.total - getters.activeCount
  }
}

// methods 같은. (computed에 바인딩)
const mutations = {
  assignDB (state, db) {
    state.db = db
  },
  createDB (state, newTodo) {
    state.db
      .get('todos')
      .push(newTodo)
      .write()
  },
  updateDB (state, { todo, value }) {
    state.db
      .get('todos')
      .find({ id: todo.id })
      .assign(value)
      .write()
  },
  deleteDB (state, todo) {
    state.db
      .get('todos')
      .remove({ id: todo.id })
      .write()
  },
  assignTodos (state, todos) {
    state.todos = todos
  },
  pushTodo (state, newTodo) {
    state.todos.push(newTodo)
  },
  assignTodo (state, payload) {
    const { foundTodo, value } = payload

    _assign(foundTodo, value)
  },
  updateTodo (state, { todo, key, value }) {
    todo[key] = value
  },
  deleteTodo (state, index) {
    // Vue.delete(state.todos, index)
    state.todos.splice(index, 1)
  },
  updateFilter (state, filter) {
    state.filter = filter
  }
}

// methods 같은. (computed에 바인딩, 비동기 처리 가능)
const actions = {
  initDB ({ state, commit }) {
    const adapter = new LocalStorage('todo-app') // DB name
    commit('assignDB', low(adapter))

    const hasTodos = state.db
      .has('todos') // Collection name
      .value()

    // 기존에 저장된 DB가 있는지 확인
    if (hasTodos) {
      // 깊은 배열 복사, `this.todos`를 수정할 때 `this.db.getState().todos`를 직접 참조하는 문제를 방지할 수 있습니다.
      commit('assignTodos', _cloneDeep(state.db.getState().todos))
    } else {
      // Local DB 초기화
      state.db
        .defaults({
          todos: []
        })
        .write()
    }
  },
  createTodo ({ state, commit }, title) {
    const newTodo = {
      id: cryptoRandomString({ length: 10 }),
      title,
      createdAt: new Date(),
      updatedAt: new Date(),
      done: false
    }

    try {
      // DB에 저장
      commit('createDB', newTodo)
      // 로컬(local)에 반영
      commit('pushTodo', newTodo)
    } catch (error) {
      console.error(error)
    }
  },
  updateTodo ({ state, commit }, payload) {
    const { todo, value } = payload

    try {
      // DB에 저장
      commit('updateDB', payload)
      // Lodash 라이브러리 활용
      const foundTodo = _find(state.todos, { id: todo.id })
      commit('assignTodo', {
        foundTodo,
        value
      })
    } catch (error) {
      console.error(error)
    }
  },
  deleteTodo ({ state, commit }, todo) {
    try {
      // DB에 저장
      commit('deleteDB', todo)
      // 로컬(local)에 반영
      // Lodash 라이브러리 활용
      const foundIndex = _findIndex(state.todos, { id: todo.id })
      commit('deleteTodo', foundIndex)
    } catch (error) {
      console.log(error)
    }
  },
  completeAll ({ state, commit }, checked) {
    const newTodos = state.db
      .get('todos')
      .forEach(todo => {
        commit('updateTodo', {
          todo,
          key: 'done',
          value: checked
        })
      })
      .write() // 수정된 `todos` 배열을 반환합니다.

    commit('assignTodos', _cloneDeep(newTodos))
  },
  clearCompleted ({ state, commit, dispatch }) {
    // Lodash 라이브러리 활용
    _forEachRight(state.todos, todo => {
      if (todo.done) {
        dispatch('deleteTodo', todo)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
