import request from '@/service'
import { IRole, PageParams } from '@/types/type'

export const getRoleList = (data: PageParams) => {
  return request({
    url: '/api/role/list',
    method: 'get',
    data,
  })
}

export const roleAddApi = (data: IRole) => {
  return request({
    url: `/api/role`,
    method: 'post',
    data,
  })
}

export const roleUpdateApi = (id: string | number, data: IRole) => {
  return request({
    url: `/api/role/${id}`,
    method: 'put',
    data,
  })
}

export const roleDeleteApi = (id: string | number) => {
  return request({
    url: `/api/role/${id}`,
    method: 'delete',
  })
}
