<template>
  <div class="todo-app">

    <div class="todo-app__actions">
      <!-- FILTERS -->
      <div class="filters">
        <router-link
          to="all"
          tag="button"
        >
          모든 항목 ({{ total }})
        </router-link>
        <router-link
          to="active"
          tag="button"
        >
          해야 할 항목 ({{ activeCount }})
        </router-link>
        <router-link
          to="completed"
          tag="button"
        >
          완료된 항목 ({{ completedCount }})
        </router-link>
      </div>

      <!-- ACTIONS -->
      <div class="actions clearfix">
        <label class="float--left">
          <input
            v-model="allDone"
            type="checkbox"
          />
          <span class="icon"><i class="material-icons">done_all</i></span>
        </label>
        <div class="float--right clearfix">
          <button
            class="btn float--left"
            @click="scrollToTop"
          >
            <i class="material-icons">expand_less</i>
          </button>
          <button
            class="btn float--left"
            @click="scrollToBottom"
          >
            <i class="material-icons">expand_more</i>
          </button>
          <button
            class="btn btn--danger float--left"
            @click="clearCompleted"
          >
            <i class="material-icons">delete_sweep</i>
          </button>
        </div>
      </div>
    </div>

    <!-- LIST -->
    <div class="todo-app__list">
      <todo-item
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
      />
    </div>

    <!-- INSERT -->
    <todo-creator class="todo-app__creator" />

  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import scrollTo from 'scroll-to'

import TodoCreator from '~/components/TodoCreator'
import TodoItem from '~/components/TodoItem'

export default {
  name: 'TodoApp',
  components: {
    TodoCreator,
    TodoItem
  },
  computed: {
    // ...mapState('todoApp', [
    //   'db',
    //   'todos'
    // ]),
    ...mapGetters('todoApp', [
      'filteredTodos',
      'total',
      'activeCount',
      'completedCount'
    ]),
    allDone: {
      get () {
        // 전체 항목 개수와 완료된 항목 개수가 일치하고 항목 개수가 1개 이상인 경우.
        return this.total === this.completedCount && this.total > 0
      },
      set (checked) {
        this.completeAll(checked)
      }
    }
  },
  watch: {
    $route () {
      this.updateFilter(this.$route.params.id)
    }
  },
  created () {
    this.initDB()
  },
  methods: {
    ...mapMutations('todoApp', [
      'updateFilter'
    ]),
    ...mapActions('todoApp', [
      'initDB',
      'completeAll',
      'clearCompleted'
    ]),
    scrollToBottom () {
      scrollTo(0, document.body.scrollHeight) // x, y
    },
    scrollToTop () {
      scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss">
  @import "scss/style";

  .filters button.router-link-active {
    background: royalblue;
    color: white;
  }
</style>
