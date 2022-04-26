import request from '@/service'
import { UserInterface } from '@/types/type'
// interface Req {
//   apiKey: string
//   area?: string
//   areaID?: string
// }
// interface Res {
//   area: string
//   areaCode: string
//   areaid: string
//   dayList: any[]
// }
// export const get15DaysWeatherByArea = (data: Req) => {
//   return request<Req, Res>({
//     url: '/api/common/weather/get15DaysWeatherByArea',
//     method: 'GET',
//     data,
//     interceptors: {
//       requestInterceptors(res) {
//         return res
//       },
//       responseInterceptors(result) {
//         return result
//       },
//     },
//   })
// }

export const loginApi = <T = { userName: string; userPwd: string }>(
  data: T,
) => {
  return request<T, UserInterface>({
    url: '/api/login',
    method: 'post',
    data,
  })
}

export const menuListApi = () => {
  return request({
    url: '/api/menu/list',
    method: 'get',
  })
}
