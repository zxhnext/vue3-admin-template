import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/store'
import router from './router'
// import installElementPlus from './plugins/element'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入全局样式
import '@/styles/index.scss'
// 导入 svgIcon
import installIcons from '@/icons/index'

const app = createApp(App)
// installElementPlus(app)
installIcons(app)

app.use(router).use(pinia).use(ElementPlus).mount('#app')
