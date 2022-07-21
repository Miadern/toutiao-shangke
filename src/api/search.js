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

/**
 * 获取搜索结果
 * @param {*} q 搜索关键词
 * @param {*} page 页数，不传默认为1
 * @param {*} perpage 每页数量，不传每页数量由后端决定
 * @returns
 */

export const getSearchResult = (q, page, perpage) => {
  return request({
    url: '/v1_0/search',
    method: 'get',
    params: { q, page, per_page: perpage }
  })
}
