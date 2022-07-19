import request from '@/utils/request'

/**
 * 获取频道文章
 * @param {*} channelId 频道ID
 * @param {*} timestamp 获取第一页的文章
 * @returns
 */
export const getArticleList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
