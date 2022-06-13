import Request from './request'
import { AxiosResponse } from 'axios'

import type { RequestConfig } from './request/types'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const TOKEN_INVALID = 'Token认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后重试'

interface XTResponse<T> {
  code: number
  msg: string
  data: T
}
interface XTRequestConfig<T, R> extends RequestConfig<XTResponse<R>> {
  data?: T
}

const request = new Request({
  baseURL: import.meta.env.BASE_URL,
  timeout: 1000 * 60 * 5,
  validateStatus: function (status) {
    return status < 600 // 处理所有状态码的情况
  },
  interceptors: {
    // 全局请求拦截器
    requestInterceptors: config => config,
    // 全局响应拦截器
    responseInterceptors: (result: AxiosResponse) => {
      const { code, msg } = result.data
      if (code != 200) {
        if (code === 500001) {
          ElMessage.error(TOKEN_INVALID)
          const router = useRouter()
          setTimeout(() => {
            router.push('/login')
          }, 1500)
        } else {
          ElMessage.error(msg || NETWORK_ERROR)
        }
      }
      return result
    },
  },
})

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {XTRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const xtRequest = <D = any, T = any>(config: XTRequestConfig<D, T>) => {
  const { method = 'GET' } = config
  if (method === 'get' || method === 'GET') {
    config.params = config.data
  }
  return request.request<XTResponse<T>>(config)
}
// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url)
}
// 取消全部请求
export const cancelAllRequest = () => {
  return request.cancelAllRequest()
}

export default xtRequest
