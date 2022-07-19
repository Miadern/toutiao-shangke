import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 4000
})

request.interceptors.request.use(
  (config) => {
    if (store.state.user.token) {
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
