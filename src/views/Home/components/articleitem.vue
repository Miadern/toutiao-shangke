<template>
  <div>
    <!-- 1张图片的结构 -->
    <van-cell
      :title="articleInfo.title"
      v-if="articleInfo.cover.type === 0"
      @click="goDetail(articleInfo.art_id)"
    >
      <template #label> {{ articleDesc }} </template>
    </van-cell>
    <!-- 2张图片的结构 -->
    <van-cell
      :title="articleInfo.title"
      v-if="articleInfo.cover.type === 1"
      @click="goDetail(articleInfo.art_id)"
    >
      <template #label> {{ articleDesc }} </template>
      <template>
        <van-image
          width="3rem"
          height="2rem"
          :src="articleInfo.cover.images[0]"
        />
      </template>
    </van-cell>
    <!-- 3张图片的结构 -->
    <van-cell
      :title="articleInfo.title"
      v-if="articleInfo.cover.type === 3"
      @click="goDetail(articleInfo.art_id)"
    >
      <template #label>
        <van-image
          v-for="(item, index) in articleInfo.cover.images"
          :key="index"
          width="3rem"
          height="2rem"
          :src="item"
        />
        {{ articleDesc }}
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  created() {
    // 测试
    /* console.log(this.articleInfo) */
  },
  props: {
    articleInfo: {
      type: Object,
      require: true
    }
  },
  computed: {
    articleDesc() {
      const art = this.articleInfo
      const time = dayjs(art.pubdate).fromNow()
      return `${art.aut_name} ${art.comm_count}评论 ${time} `
    }
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        name: 'detail',
        params: {
          id
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-image__img) {
  width: 90%;
}
</style>
