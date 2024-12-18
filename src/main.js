import {
    createApp
} from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import store from '@/store/store'
import {
    createPinia
} from 'pinia'
import '@/assets/style.scss'

const app = createApp(App)
app.use(store)
app.use(createPinia())
app.use(router)
app.mount('#app')