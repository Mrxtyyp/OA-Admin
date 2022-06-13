<template>
  <el-container class="container">
    <el-aside :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
      <!-- 系统LOGO -->
      <div class="logo">
        <img src="~@/assets/logo.png" />
        <span v-if="!isCollapse">Manager</span>
      </div>

      <el-menu
        default-active="2"
        background-color="#001529"
        text-color="#fff"
        router
        :collapse="isCollapse"
        class="nav-menu"
      >
        <TreeMenu :user-menu="userMenu" />
      </el-menu>
    </el-aside>
    <el-container :class="['content-right', isCollapse ? 'fold' : 'unfold']">
      <el-header class="nav-top">
        <div class="nav-left">
          <div class="menu-fold" @click="toggle">
            <el-icon><Fold /></el-icon>
          </div>
          <div class="bread">
            <BreadCrumb />
          </div>
        </div>
        <div class="user-info">
          <el-badge
            :is-dot="noticeCount > 0 ? true : false"
            class="notice"
            type="danger"
          >
            <el-icon><Bell /></el-icon>
          </el-badge>
          <el-dropdown class="dropdown-box" @command="handleLogout">
            <span class="user-link">
              {{ userStore.userInfo.userName }}
              <el-icon><Avatar /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email"
                  >邮箱：{{ userStore.userInfo.userEmail }}</el-dropdown-item
                >
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="container">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Fold, Right, Bell } from '@element-plus/icons-vue'
import { menuListApi } from '@/api'
import TreeMenu from './treeMenu.vue'

import BreadCrumb from './BreadCrumb.vue'

import { useUserStore } from '@/store'

const userMenu = ref([])

const userStore = useUserStore()

const isCollapse = ref(false)

const noticeCount = ref(0)

const toggle = () => {
  isCollapse.value = !isCollapse.value
}

const handleLogout = (key: string) => {
  console.log(key)
}

const getUserMenu = async () => {
  const { data } = await menuListApi()
  userMenu.value = data
}

onMounted(() => {
  getUserMenu()
})
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    overflow-y: auto;
    transition: width 0.5s;
    overflow-x: hidden;
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      height: 50px;
      img {
        margin: 0 16px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #ffffff;
      }
      span {
        margin-right: 16px;
      }
    }
    .nav-menu {
      height: calc(100vh - 50px);
      border-right: none;
    }
    // 合并
    &.fold {
      width: 64px;
    }
    // 展开
    &.unfold {
      width: 200px;
    }
  }

  .content-right {
    margin-left: 200px;
    transition: margin-left 0.5s;
    // 合并
    &.fold {
      margin-left: 64px;
    }
    // 展开
    &.unfold {
      margin-left: 200px;
    }
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      .nav-left {
        display: flex;
        align-items: center;
        .menu-fold {
          margin-right: 15px;
          font-size: 18px;
        }
      }
      .user-info {
        .notice {
          line-height: 30px;
          margin-right: 15px;
        }
        .user-link {
          cursor: pointer;
          //   color: #409eff;
        }
      }
      .dropdown-box {
        line-height: 50px;
      }
    }
    .wrapper {
      background: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);
      .main-page {
        background: #fff;
        height: 100%;
      }
    }
  }
}
</style>
