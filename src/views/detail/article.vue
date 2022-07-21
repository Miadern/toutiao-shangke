<template>
  <div></div>
</template>

<script>
import { getArticleInfo } from '@/api'
export default {
  created() {
    this.getArticleInfo()
  },
  props: {
    artId: {
      type: String,
      required: true
    }
  },
  methods: {
    async getArticleInfo() {
      const res = await getArticleInfo(this.artId)
      console.log(res)
    }
  }
}
</script>

<style></style>
