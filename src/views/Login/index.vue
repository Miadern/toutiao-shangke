<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar class="navbar" title="登录" @click-left="onClickLeft">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 表单 -->
    <van-form @submit="login" ref="form" class="from">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="iconfont icon-shouji"> </span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="iconfont icon-yanzhengma"> </span>
        </template>
        <template #right-icon>
          <van-count-down :time="60 * 1000" v-if="isShowCount" />
          <van-button
            class="code-btn"
            type="info"
            size="mini"
            round
            v-else
            native-type="button"
            @click="sendCode"
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
import { mobileRules, codeRules } from './rule'
import { login, sendCode } from '@/api/user'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCount: false
    }
  },
  methods: {
    // 发送验证码
    async sendCode() {
      try {
        // 校验一次手机号
        await this.$refs.form.validate('mobile')
        // 发送请求，获取验证码
        await sendCode(this.mobile)
        // 显示倒计时
        this.isShowCount = true
      } catch (error) {
        if (!error.response) {
          this.$toast.fail('请输入正确的手机号')
        } else {
          const status = error.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(error.response.data.message)
          }
        }
      }
    },
    // 返回按钮
    onClickLeft() {
      this.$router.back()
    },
    // 登录按钮
    async login() {
      this.$toast.loading({
        message: '载入中...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        // 储存token
        this.$store.commit('setUser', res.data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功！')
      } catch (err) {
        // 获取状态码
        const status = err.response.status
        // 设置提示默认值
        let massage = '登录错误，请重试~'
        if (status === 400) {
          massage = err.response.data.message
        }
        // 轻提示
        this.$toast.fail(massage)
      }
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
