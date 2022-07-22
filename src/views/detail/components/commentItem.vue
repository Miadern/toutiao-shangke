<template>
  <div>
    <div class="card" v-for="(item, index) in List" :key="index">
      <van-image round width="36px" height="36px" :src="item.aut_photo" />
      <div class="txt">
        <div class="top">{{ item.aut_name }}</div>
        <p>{{ item.content }}</p>
        <div class="bottom">
          <span>{{ item.pubdate }}</span>
          <span class="hui">回复{{ item.reply_count }}</span>
        </div>
      </div>
      <span><van-icon name="good-job-o" />赞</span>
    </div>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    List: {
      type: Array,
      require: true
    }
  },
  computed: {
    // 将时间计算为几年前~
    dataEdit() {
      const time = dayjs(this.List.pubdate).fromNow()
      return `${time}`
    }
  }
}
</script>

<style scoped lang="less">
.card {
  display: flex;
  font-size: 0.37333rem;
}
</style>
