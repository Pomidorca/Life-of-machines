import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/store'
import '@/assets/style.css'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

const app = createApp(App)
app.use(PrimeVue);
app.use(router)
app.use(store)
app.mount('#app')
