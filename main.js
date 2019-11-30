import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// eslint-disable-next-line
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App) // https://css-tricks.com/what-does-the-h-stand-for-in-vues-render-method/
})
