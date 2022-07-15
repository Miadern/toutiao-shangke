/**
 * token快速储存的封装
 */

import storage from './storage'
// tokenKey为TOKEN名
const tokenKey = 'HEIMA_TOUTIAO_TOKEN'

export const getToken = () => storage.get(tokenKey)

export const setToken = (token) => storage.set(tokenKey, token)

export const removeToken = () => storage.remove(tokenKey)
