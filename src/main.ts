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

createApp(App).use(store).use(router).use(PageTableLayout).mount('#app')
