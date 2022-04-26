<template>
  <div class="index">
    <span>当前数值{{ countComputed }}</span>
    <br />
    <span>双倍数值{{ doubleCount }}</span>
    <br />
    <el-button type="primary" size="default" @click="countStore.countAdd">
      +1
    </el-button>
    <el-button type="primary" size="default" @click="countStore.countAdd">
      -1
    </el-button>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useCountStore } from '@/store'
import { storeToRefs } from 'pinia'
const countStore = useCountStore()
// 通过计算属性
const countComputed = computed(() => countStore.count)
// 通过 storeToRefs api 结构
const { doubleCount } = storeToRefs(countStore)
</script>
<style scoped></style>
<!-- 
<template>
  <div id="home">
    <div class="container">
      <div class="loader-wrapper">
        <div class="loader-1"></div>
        <div class="loader-2"></div>
        <div class="loader-3"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import gsap from 'gsap'
import { onMounted } from 'vue'

const loadding = () => {
  const loader = gsap.timeline()
  const duration = 0.25
  const delay = 1
  loader
    .to('.loader-3', duration, { width: 35 })
    .set('.loader-2', {
      rotate: 90,
      transformOrigin: '45px 45px',
      marginLeft: 0,
    })
    .to('.loader-2', duration, { width: 90 })
    .set('.loader-2', { transformOrigin: '72px 17px', rotate: 270 })
    .to('.loader-2', duration, { width: 35 })
    .to('.loader-1', duration, { width: 90 })
    .set('.loader-1', { transformOrigin: '45px 17.5px', rotate: 180 })
    .to('.loader-1', duration, { width: 35 })
    .set('.loader-3', {
      transformOrigin: '45px 45px',
      rotate: 270,
      marginTop: 0,
    })
    .to('.loader-3', duration, { width: 90 })
    .set('.loader-3', { transformOrigin: '17.5px 17.5px', rotate: 90 })
    .to('.loader-3', duration, { width: 35 })
    .set('.loader-2', { transformOrigin: '45px 45px', rotate: 180 })
    .to('.loader-2', duration, { width: 90 })
    .set('.loader-2', { transformOrigin: 'bottom center', marginTop: 20 })
    .to('.loader-2', duration, { width: 35 })
    .set('.loader-1', { transformOrigin: '45px 45px', rotate: 90 })
    .to('.loader-1', duration, { width: 90 })
    .set('.loader-1', { transformOrigin: '72px 17.5px', rotate: 270 })
    .to('.loader-1', duration, { width: 35 })
    .set('.loader-3', { rotate: 360 })
    .to('.loader-3', duration, { width: 90 })
    .set('.loader-3', { transformOrigin: '45px 17.5px', rotate: 180 })
    .to('.loader-3', duration, { width: 35 })
    .set('.loader-2', {
      transformOrigin: '45px 45px',
      rotate: 270,
      marginTop: 0,
    })
    .to('.loader-2', duration, { width: 90 })
    .set('.loader-2', { transformOrigin: '17.5px 17.5px', rotate: 90 })
    .to('.loader-2', duration, { width: 35 })
    .set('.loader-1', { transformOrigin: '45px 45px', rotate: 180 })
    .to('.loader-1', duration, { width: 90 })
    .set('.loader-1', { transformOrigin: 'bottom center', marginTop: 20 })
    .to('.loader-1', duration, { width: 35 })
    .set('.loader-3', { transformOrigin: '45px 45px', rotate: 90 })
    .to('.loader-3', duration, { width: 90 })
    .set('.loader-3', { transformOrigin: '72px 17.5px', rotate: 270 })
    .to('.loader-3', duration, { width: 35 })
    .set('.loader-2', { transformOrigin: '45px 17.5px', rotate: 0 })
    .to('.loader-2', duration, { width: 90 })
    .set('.loader-2', { rotate: 180 })
    .to('.loader-2', duration, { width: 35 })
    .set('.loader-1', {
      transformOrigin: '45px 45px',
      rotate: 270,
      marginTop: 0,
    })
    .to('.loader-1', duration, { width: 90 })
    .set('.loader-1', { transformOrigin: '17.5px 17.5px', rotate: 90 })
    .to('.loader-1', duration, { width: 35 })
    .set('.loader-3', {
      transformOrigin: '45px 17.5px',
      rotate: 180,
      marginTop: 55,
    })
    .to('.loader-3', duration, { width: 90 })
    .set('.loader-2', { marginLeft: 55 })
    .delay(delay)
    .repeat(-1)
}

onMounted(() => {
  loadding()
})
</script>
<style lang="scss" scoped>
/* Colors */
$background: #f6cb4f;
$theme-black: #0d0d0d;

/* Dimensions */
$loader-wrapper-width: 90px;
$loader-width: 35px;
$loader-height: 35px;
%center {
  display: flex;
  justify-content: center;
  align-items: center;
}
%loader {
  position: absolute;
  width: $loader-width;
  height: $loader-height;
  border: 10px solid $theme-black;
  border-radius: 40px;
}
#home {
  height: 100%;
  width: 100%;

  /* Specific Styles */
  .container {
    @extend %center;
    height: 100vh;
  }
  .loader-wrapper {
    display: flex;
    position: absolute;
    top: calc(50% - calc(#{$loader-wrapper-width} / 2));
    left: calc(50% - calc(#{$loader-wrapper-width} / 2));
    width: $loader-wrapper-width;
  }
  .loader-1 {
    @extend %loader;
  }
  .loader-2 {
    @extend %loader;
    margin-left: 55px;
  }
  .loader-3 {
    @extend %loader;
    width: $loader-wrapper-width;
    margin-top: 55px;
  }
}
</style> -->
