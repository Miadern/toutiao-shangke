import request from '@/utils/request'
import storage from '@/utils/storage'
/**
 * 获取我的频道
 * @returns Promise
 */

export const getMyChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

/**
 * 获取全部频道
 * @returns
 */
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}

// 使用封装快捷本地储存的函数
const HEIME_TOUTIAO_CHANNEL = 'HEIME_TOUTIAO_CHANNEL'

export const getMyChannelByLocal = () => storage.get(HEIME_TOUTIAO_CHANNEL)

export const setMyChannelByLocal = (channel) =>
  storage.set(HEIME_TOUTIAO_CHANNEL, channel)

/**
 * 删除用户频道
 * @param {*} target 删除用户频道的ID
 * @returns
 */
export const delMyChannels = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

export const addMyChannels = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [
        {
          id,
          seq
        }
      ]
    }
  })
}
