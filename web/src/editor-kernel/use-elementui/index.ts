import ElementPlus from 'element-plus'
import { App } from 'vue'

export default function useElementUI(app: App) {
  app.use(ElementPlus, { size: 'small', zIndex: 3000 })
}
