<template>
  <template v-for="menu in userMenu">
    <el-sub-menu
      v-if="
        menu.children &&
        menu.children.length > 0 &&
        menu.children[0].menuType == 1
      "
      :key="menu._id"
      :index="menu.path"
    >
      <template #title>
        <el-icon v-if="menu.icon">
          <Component :is="typeOfIcon[menu.icon]"></Component>
        </el-icon>
        <span>{{ menu.menuName }}</span>
      </template>
      <TreeMenu :user-menu="menu.children" />
    </el-sub-menu>

    <!-- Vue 3.x (alternate solution: make sure the keys are always unique) -->
    <el-menu-item
      v-else-if="menu.menuType == 1"
      :key="menu._id"
      :index="menu.path"
      >{{ menu.menuName }}</el-menu-item
    >
  </template>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Setting, Promotion } from '@element-plus/icons-vue'
import { MenuIneterface } from '../types/type'
defineProps({
  userMenu: {
    type: Array as PropType<MenuIneterface[]>,
    required: true,
  },
})

const typeOfIcon = {
  'el-icon-setting': Setting,
  'el-icon-s-promotion': Promotion,
}
</script>
<style scoped></style>
