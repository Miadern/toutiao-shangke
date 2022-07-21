import request from '@/utils/request'

/**
 *获取新闻详情
 * @param {*} id 文章id
 * @returns
 */
export const getArticleInfo = (article_id) => {
  return request({
    url: `/v1_0/articles/${article_id}`
  })
}
