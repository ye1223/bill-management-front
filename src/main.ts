import { createApp } from 'vue'
import Particles from "vue3-particles"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import pinia from './store'
import router from './router'
import App from './App.vue'

createApp(App)
.use(ElementPlus)
.use(pinia)
.use(router)
.use(Particles)
.mount('#app')

// console.log(import.meta.env.BASE_URL)