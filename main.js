import Vue from 'vue'
import App from './App'
import router from './router'

// eslint-disable-next-line
new Vue({
  el: '#app',
  router,
  render: h => h(App) // https://css-tricks.com/what-does-the-h-stand-for-in-vues-render-method/
})
