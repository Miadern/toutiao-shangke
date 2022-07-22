<template>
  <div>
    <div class="main">
      <div class="header">
        <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.main {
  background: #f5f7f9;
}
</style>
