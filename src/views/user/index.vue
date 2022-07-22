<template>
  <div>
    <div class="main">
      <!-- 头部导航 -->
      <div class="header">
        <van-nav-bar
          title="个人信息"
          left-arrow
          @click-left="onClickLeft"
          class="navBar"
        />
      </div>

      <!-- 主体部分 -->
      <div class="cell">
        <label for="up_file_input">
          <van-cell title="头像" is-link>
            <van-image round width="30px" height="30px" :src="photo" />
          </van-cell>
          <input
            type="file"
            id="up_file_input"
            v-show="false"
            @change="imgGet"
          />
        </label>
        <van-cell title="昵称" is-link :value="name" @click="nameClick" />
        <van-cell
          title="性别"
          is-link
          :value="gender ? '女' : '男'"
          @click="genderClick"
        />
        <van-cell
          title="生日"
          is-link
          :value="birthday"
          @click="nameBirthday"
        />
      </div>
    </div>
    <!-- 弹出层 -->
    <!-- 名称 -->
    <van-popup v-model="namePop" position="bottom" :style="{ height: '100%' }">
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="onClickLeftName"
        @click-right="onClickRightName"
      />
      <van-field
        v-model="message"
        rows="3"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入新的昵称"
        show-word-limit
      />
    </van-popup>
    <!-- 性别 -->
    <van-popup v-model="genderPop" position="bottom" :style="{ height: '50%' }">
      <van-picker
        title="标题"
        show-toolbar
        :columns="columnsGender"
        @confirm="onConfirmGender"
        @cancel="onCancelGender"
      />
    </van-popup>
    <!-- 日期 -->
    <van-popup
      v-model="birthdayPop"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirmBirthday"
        @cancel="onCancelBirthday"
      />
    </van-popup>

    <!-- 图片 -->

    <van-popup v-model="imgPop" position="bottom" :style="{ height: '100%' }">
      <!-- 111 -->
      <div>
        <Vue-imageCutting
          :picturePath="img"
          @cancel="imgExt"
          @confirm="imgGo"
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile, editUserProfile, editUserPhoto } from '@/api'

export default {
  components: {},
  data() {
    return {
      img: '/src/assets/images',
      // 图片弹出层
      imgPop: false,
      // 日期
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(2022, 7, 22),
      currentDate: '',
      // 性别列表
      columnsGender: ['男', '女'],
      // 修改昵称的界面的val
      message: '',
      // 名称是否弹出
      namePop: false,
      userInfo: {},
      name: '',
      gender: '',
      genderPop: false,
      birthday: '',
      birthdayPop: false,
      photo: '',
      // tuttttttt
      maskOpacityData: 0.7,
      formatData: 'jpeg',
      minZoomData: 0.5,
      crossDomainData: false,
      maxZoomData: 3,
      iconColorData: '#ffffff',
      backgroundColorData: '#000000',
      buttonColorData: '#0e9a00',
      picturePathData: 'xxx.jpg',
      imgRes: ''
    }
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    isLogin() {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    // 编辑头像
    async editUserPhoto() {
      try {
        const file = await this.base64ImgtoFile(this.imgRes.base64, 'photo')
        const formData = new FormData()
        formData.append('photo', file)
        await editUserPhoto(formData)
        this.getUserInfo()
        this.$toast.success('上传成功！')
      } catch (error) {
        this.$toast.fail('上传失败')
      }
    },
    // 转文件流
    // dataurl 为传进来的base64格式的图片地址， return 返回的为file格式
    base64ImgtoFile(dataurl, filename = 'file') {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const suffix = mime.split('/')[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      })
    },

    // 确认图片返回base64
    imgGo(file) {
      this.imgRes = file
      this.editUserPhoto()
      this.imgPop = false
    },
    // 退出图片
    imgExt() {
      this.imgPop = false
    },
    // 图片
    imgGet(event) {
      const file = event.target.files[0]
      const formData = new FormData()
      formData.append('file', file)
      this.img = file
      this.imgPop = true
    },

    // 生日卡片确认和返回
    async onConfirmBirthday(value) {
      try {
        this.birthdayPop = false
        const time = new Date(value)
        const newTime =
          time.getFullYear() +
          '-' +
          (time.getMonth() + 1) +
          '-' +
          time.getDate() +
          ' '
        this.birthday = newTime
        await this.editUserProfile()
        this.$toast.success('上传成功！')
        this.getUserInfo()
      } catch (error) {
        this.$toast.fail('上传失败')
      }
    },

    onCancelBirthday() {
      this.birthdayPop = false
    },
    // 点击生日卡片
    nameBirthday() {
      this.currentDate = new Date(this.birthday.replace(/-/g, ','))
      this.birthdayPop = true
    },
    // 点击性别卡片
    genderClick() {
      this.genderPop = true
    },
    // 性别界面的确认按钮
    async onConfirmGender(val, index) {
      try {
        this.genderPop = false
        this.gender = index
        await this.editUserProfile()
        this.$toast.success('上传成功！')
        this.getUserInfo()
      } catch (error) {
        this.$toast.fail('上传失败')
      }
    },
    // 性别界面的取消按钮
    onCancelGender() {
      this.genderPop = false
    },
    // 点击昵称卡片
    nameClick() {
      this.namePop = true
      this.message = this.name
    },
    // 昵称界面导航栏返回
    onClickLeftName() {
      this.namePop = false
    },
    // 昵称界面导航栏确认
    async onClickRightName() {
      try {
        this.namePop = false
        // 发送编辑名称
        this.name = this.message
        await this.editUserProfile()
        this.$toast.success('上传成功！')
        // 获取一次资料
        this.getUserInfo()
      } catch (error) {
        this.$toast.fail('上传失败')
      }
    },
    // 导航栏返回
    onClickLeft() {
      this.$router.back()
    },

    async getUserInfo() {
      // 如果用户登录了，再去获取用户信息
      if (this.isLogin) {
        try {
          const res = await getUserProfile()
          const { name, gender, birthday, photo } = res.data.data
          this.name = name
          this.gender = gender
          this.birthday = birthday
          this.photo = photo
        } catch (error) {
          this.$toast.fail('请重新登录！')
        }
      }
    },
    // 编辑用户资料
    async editUserProfile() {
      try {
        const res = await editUserProfile(this.name, this.gender, this.birthday)
        console.log(res)
      } catch (error) {
        this.$toast.fail('编辑失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.main {
  background: #f5f7f9;
  height: calc(100vh);
  //头部导航栏
  .header {
    .navBar {
      background-color: rgb(50, 150, 250);
      :deep(.van-nav-bar__title) {
        color: #fff;
      }
      :deep(.van-icon) {
        color: #fff;
      }
    }
  }
}
</style>
