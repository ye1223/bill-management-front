import { createApp } from 'vue'
import Particles from 'vue3-particles'
import './index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import pinia from './store'
import router from './router'
import App from './App.vue'
// 自定义
// import Toast from './components/UI/Toast/index'

createApp(App)
// .use(Toast)
.use(ElementPlus, { locale })
.use(pinia)
.use(router)
.use(Particles)
.mount('#app')

// 获取全局
// const test = getCurrentInstance() as ComponentInternalInstance
// test.appContext.config.globalProperties.$toast.error('hhah')
