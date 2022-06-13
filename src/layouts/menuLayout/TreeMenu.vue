<template>
  <template v-for="menu in userMenu">
    <el-sub-menu
      v-if="
        menu.children && menu.children.length > 0 && menu.children[0].type == 1
      "
      :key="menu.id"
      :index="menu.path"
    >
      <template #title>
        <el-icon v-if="menu.icon">
          <Component :is="menu.icon"></Component>
        </el-icon>
        <span>{{ menu.name }}</span>
      </template>
      <TreeMenu :user-menu="menu.children" />
    </el-sub-menu>

    <!-- Vue 3.x (alternate solution: make sure the keys are always unique) -->
    <el-menu-item
      v-else-if="menu.type == 1"
      :key="menu.id + '_only'"
      :index="menu.path"
      >{{ menu.name }}</el-menu-item
    >
  </template>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { MenuIneterface } from '@/types/type'
defineProps({
  userMenu: {
    type: Array as PropType<MenuIneterface[]>,
    required: true,
  },
})
</script>
<style scoped></style>
