import { createApp, h, provide } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'

import { apolloClient } from './boot/apollo'
import { DefaultApolloClient } from '@vue/apollo-composable'

import Router from './router/index'

import './index.css'

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
}).use(Router)
  .use(createPinia())
  .mount('#app')
