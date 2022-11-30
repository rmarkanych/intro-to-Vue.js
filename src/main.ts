import { createApp } from 'vue'
import App from './'

import '@/assets/styles/main.scss'

const app = createApp(App)

app.mount('#app')

export {
  app
}
