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
/**
 *取消关注用户
 * @param {*} target 取消关注的用户id
 * @returns
 */
export const delFollowUser = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}

/**
 *关注用户
 * @param {*} target 被关注的用户id
 * @returns
 */
export const followUser = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: { target }
  })
}
/**
 *  获取用户的关注列表
 * @param {*} page 页数
 * @param {*} per_page 每页数量
 * @returns
 */
export const getfollowUserList = (page) => {
  return request({
    method: 'GET',
    url: '/v1_0/user/followings',
    params: { page, per_page: 100 }
  })
}

/**
 *获取评论或评论回复
 * @param {*} type a-对文章(article)的评论，c-对评论(comment)的回复
 * @param {*} source 源id，文章id或评论id
 * @param {*} offset 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * @param {*} limit 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
 * @returns
 */
export const getComments = (type, source, offset, limit) => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params: { type, source, offset, limit }
  })
}

/**
 * 获取用户收藏列表
 * @param {*} page 页数，不传默认为1
 * @returns
 */
export const getCollectionList = (page) => {
  return request({
    method: 'GET',
    url: '/v1_0/article/collections',
    params: { page, per_page: 100 }
  })
}

/**
 * 收藏文章
 * @param {*} target 收藏的目标文章id
 * @returns
 */
export const collectionArt = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: { target }
  })
}

/**
 * 取消收藏文章
 * @param {*} target 取消收藏的文章
 * @returns
 */
export const CancelCollectionArt = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}

/**
 * 对文章或者评论进行评论
 * @param {string} target 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 * @param {string} content 评论内容
 * @param {string} art_id 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 * @returns
 */
export const sendComments = (target, content, art_id) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data: { target, content, art_id }
  })
}
