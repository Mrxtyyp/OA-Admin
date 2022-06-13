<script lang="ts">
export default {
  name: 'PageTableLayout',
}
</script>
<script setup lang="ts">
/**
 * 插槽：
 *      filter 筛选条件
 *      btns 操作按钮
 *      table 表格
 *      pagination 分页
 * @param title 左上角的名称，可不传，自动获取路由的title
 */
import { useSlots } from 'vue'
import { useRoute } from 'vue-router'
defineProps({
  title: {
    type: String,
    default: '',
  },
})

const route = useRoute()

const solts = useSlots()
</script>
<template>
  <div class="page-layout full">
    <div class="page-header">
      <div class="page-header-left">
        <span class="page-header-left-title">{{
          title ? title : route.meta.title
        }}</span>
        <slot name="filter" />
      </div>
      <div>
        <slot name="btns" />
      </div>
    </div>
    <div :class="['page-content', !solts.pagination && 'not-pagination']">
      <slot name="table" />
    </div>
    <div class="page-pagination">
      <slot name="pagination" />
    </div>
  </div>
</template>
