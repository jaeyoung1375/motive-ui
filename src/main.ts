
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.vue'
import router from './router'
import axios from '~/api/axiosInstance'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // <-- 추가
const app = createApp(App)

// 전역 속성에 axios 등록
app.config.globalProperties.$axios = axios

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')                             
