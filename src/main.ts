import { createApp } from 'vue'
import App from './App.vue'
// 引入 vue-router
import router from './router'
// 引入 vuex
import store from './store'
import './assets/style/index.scss'
import 'animate.css'
// 单独引入 ElMessage 和 ElMessageBox 的样式
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'

import PageTableLayout from './layouts/pageTableLayout'

const app = createApp(App)

import * as Icons from '@element-plus/icons-vue'

// 注册Icons 全局组件
Object.keys(Icons).forEach(key => {
  app.component((Icons as any)[key].name, (Icons as any)[key])
})

app.use(store).use(router).use(PageTableLayout).mount('#app')
