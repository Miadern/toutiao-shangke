import request from '@/utils/request'
import store from '@/store'

/**
 *登录
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data: { mobile, code }
  })
}

/**
 *发送验证码
 * @param {String} mobile //手机号
 * @returns Promise
 */

export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 *获取用户信息
 * @returns
 */

export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}

/**
 * 获取用户个人资料
 * @returns
 */
export const getUserProfile = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
/**
 * 编辑用户个人资料
 * @param {*} name 昵称
 * @param {*} gender 性别
 * @param {*} birthday 生日
 * @returns
 */
export const editUserProfile = (name, gender, birthday) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: { name, gender, birthday }
  })
}
/**
 * 编辑用户照片头像
 * @param {*} photo
 * @returns
 */
export const editUserPhoto = (formData) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
