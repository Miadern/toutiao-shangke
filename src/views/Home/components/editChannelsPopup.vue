<template>
  <div>
    <van-popup
      v-model="showPopup"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <div class="popupMain">
        <!-- 我的频道标题 -->
        <div class="myChannel">
          <van-cell title="我的频道">
            <van-button
              size="small"
              round
              class="editBtn"
              @click="isEdit = !isEdit"
              >{{ isEdit ? '完成' : '编辑' }}</van-button
            >
          </van-cell>
          <!-- 宫格 -->
          <van-grid :border="false" gutter="10px">
            <van-grid-item
              :text="item.name"
              v-for="(item, index) in myChannels"
              :key="item.id"
              :class="{ 'active-channel': item.name == '推荐' }"
              @click="delMyChannel(item, index)"
            >
              <template #icon
                ><van-icon
                  name="cross"
                  v-if="isEdit && item.name !== '推荐'"
                /> </template
            ></van-grid-item>
          </van-grid>
        </div>
        <!-- 推荐频道盒子 -->
        <div class="recommendChannel">
          <!-- 推荐频道标题 -->
          <van-cell title="推荐频道"> </van-cell>

          <van-grid :border="false" gutter="10px">
            <van-grid-item
              icon="plus"
              :text="item.name"
              v-for="item in recommendChannels"
              :key="item.id"
              @click="addMyChannel(item)"
            >
              <template #icon></template
            ></van-grid-item>
          </van-grid>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getAllChannels } from '@/api'

export default {
  created() {
    this.getAllChannels()
  },
  data() {
    return {
      showPopup: false,
      allChannels: [],
      isEdit: false
    }
  },
  props: {
    myChannels: {
      type: Array
    }
  },
  methods: {
    // 获得全部频道
    async getAllChannels() {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    // 删除或者跳转我的频道
    delMyChannel(item, index) {
      if (item.name !== '推荐' && this.isEdit === true) {
        return this.$emit('del-mychannel', item.id)
      }
      if (!this.isEdit) {
        this.showPopup = false
        return this.$emit('changeActive', index)
      }
    },
    addMyChannel(item) {
      this.$emit('add-mychannel', { ...item })
    }
  },
  computed: {
    // 计算属性计算出，全部频道   减去  我的频道  剩余的频道
    recommendChannels() {
      return this.allChannels.filter((item) => {
        return !this.myChannels.find((i) => i.id === item.id)
      })
    }
  }
}
</script>

<style scoped lang="less">
.popupMain {
  padding-top: 100px;

  .editBtn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 0.0266rem solid red;
  }
}
//我的频道样式
.myChannel {
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__icon-wrapper {
      position: absolute;
      top: 0;
      right: 0;
      .van-icon {
        font-size: 5px;
      }
      .van-icon-cross {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(20%, -35%);
        border: 0.02667rem solid #000;
        border-radius: 50%;
        text-align: center;
        line-height: 0.32rem;
      }
    }
  }
}

// 推荐频道的样式
.recommendChannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}

.active-channel {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
</style>
