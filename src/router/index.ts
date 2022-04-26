import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/index.vue'
import Default from '@/layout/default.vue'

// 配置路由信息
const routes: RouteRecordRaw[] = [
  { path: '/login', component: () => import('@/views/login/Login.vue') },
  {
    path: '/',
    component: Layout,
    redirect: '/welcome',
    meta: {
      title: 'OA管理系统',
    },
    children: [
      {
        path: '/welcome',
        name: '欢迎页',
        meta: {
          title: '欢迎页',
        },
        component: () => import('@/views/welcome/index.vue'),
      },
      {
        path: '/system',
        component: Default,
        meta: {
          title: '系统管理',
        },
        children: [
          {
            path: 'user',
            name: '用户管理',
            meta: {
              title: '用户管理',
            },
            component: () => import('@/views/system/user.vue'),
          },
          {
            path: 'role',
            meta: {
              title: '角色管理',
            },
            component: () => import('@/views/system/role.vue'),
          },
          {
            path: 'menu',
            meta: {
              title: '菜单管理',
            },
            component: () => import('@/views/system/menu.vue'),
          },
          {
            path: 'dept',
            meta: {
              title: '部门管理',
            },
            component: () => import('@/views/system/dept.vue'),
          },
        ],
      },
    ],
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

export default router
