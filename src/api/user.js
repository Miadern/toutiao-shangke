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
