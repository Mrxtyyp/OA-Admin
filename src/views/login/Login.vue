<!--
 * @description: 登录
 * @author: ywanzhou
 * @Date: 2022-03-06 10:40
 * @LastEditTime: 2022-03-06 13:08
 * @LastEditors: ywanzhou
 * @FilePath: \Learn-front-end-from-scratce:\Repository\practice-demo\learn-vue3-cms\src\views\login\index.vue
-->
<template>
  <div class="login-wrapper">
    <LoginCard />
  </div>
</template>
<script setup lang="ts">
import LoginCard from './components/LoginCard.vue'
</script>
<style scoped lang="scss">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fcff;
  width: 100vw;
  height: 100vh;
}
</style>
