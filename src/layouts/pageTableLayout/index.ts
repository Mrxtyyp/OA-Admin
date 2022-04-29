import { App } from 'vue'
import pageTableLayout from './index.vue'

export const PageTableLayout = Object.assign(pageTableLayout, {
  install(app: App) {
    app.component(pageTableLayout.name, pageTableLayout)
  },
})

export default PageTableLayout
