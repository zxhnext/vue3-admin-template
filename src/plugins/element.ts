import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'

export default (app: ReturnType<typeof createApp>): void => {
  app.use(ElementPlus, { locale })
}
