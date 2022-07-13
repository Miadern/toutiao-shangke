<template>
  <div id="app">
    <!-- 一级路由入口 -->
    <router-view> </router-view>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {}
  },
  created() {
    console.dir(request)
  }
}
</script>

<style lang="less"></style>
