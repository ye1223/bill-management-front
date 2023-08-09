import { createApp } from 'vue'
import Particles from "vue3-particles"
import './index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import pinia from './store'
import router from './router'
import App from './App.vue'

createApp(App)
.use(ElementPlus, {locale})
.use(pinia)
.use(router)
.use(Particles)
.mount('#app')

// console.log(import.meta.env.BASE_URL)