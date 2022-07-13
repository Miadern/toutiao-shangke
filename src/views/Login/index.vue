<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar class="navbar" title="登录" @click-left="onClickLeft">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 表单 -->
    <van-form @submit="login" class="from">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      >
        <template #label>
          <span class="iconfont icon-shouji"> </span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="password"
        name="code"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #label>
          <span class="iconfont icon-yanzhengma"> </span>
        </template>
        <template #right-icon>
          <van-button class="code-btn" type="info" size="mini" round
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!-- 登录按钮 -->
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data() {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async login() {
      const res = await login(this.mobile, this.code)
      console.log(res)
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: rgb(50, 150, 250);

  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.from {
  :deep(.van-field__label) {
    flex: 1;
  }
  :deep(.van-field__value) {
    flex: 20;
  }
  .iconfont {
    font-size: 0.49333rem;
  }
  :deep(.van-button) {
    background: #6db4fb;
  }

  .code-btn {
    background: #ededed;
    padding: 0 20px;
    color: #666;
    border: 0;
  }
}
</style>
