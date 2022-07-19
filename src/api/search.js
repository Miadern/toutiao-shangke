import request from '@/utils/request'

/**
 * 获取搜索关键词
 * @param {String} q 搜索关键词
 * @returns
 */
export const getSearchSuggestion = (q) => {
  return request({
    url: '/v1_0/suggestion',
    method: 'get',
    params: { q }
  })
}
