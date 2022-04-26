<template>
  <div class="welcome">
    <div class="content">
      <div class="sub-title box1">欢迎使用</div>
      <div class="title box2">OA管理系统</div>
      <div class="desc box3">- 你相信什么，你就成为什么样的人。</div>
    </div>
    <div class="img">
      <img src="~@/assets/images/welcome.jpeg" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { onMounted, onUnmounted } from 'vue'

const tl = gsap.timeline()
onMounted(() => {
  tl.to('.box1', { duration: 1, x: 300 }) //notice that there's no semicolon!
    .to('.box2', { duration: 2, x: 300 })
    .to('.box3', { duration: 3, x: 350 })
    .to('.box1', { duration: 1, x: 0 }) //notice that there's no semicolon!
    .to('.box2', { duration: 2, x: 0 })
    .to('.box3', { duration: 3, x: 0 })
    .repeat(-1)
})

onUnmounted(() => {
  tl.kill()
})
</script>
<style scoped lang="scss">
.welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #fff;
  .content {
    width: 650px;
    text-align: left;
    margin-bottom: 40px;
    .sub-title {
      font-size: 30px;
      line-height: 42px;
      color: #333;
    }
    .title {
      font-size: 40px;
      line-height: 62px;
      color: #409eff;
    }
    .desc {
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
