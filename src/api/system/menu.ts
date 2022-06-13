import request from '@/service'
import type { IMenu } from '@/types/type'

export const menuListApi = () => {
  return request({
    url: '/api/menu/list',
    method: 'get',
  })
}

export const menuTreeApi = () => {
  return request({
    url: '/api/menu/tree',
    method: 'get',
  })
}

export const menuDeleteApi = (id: number) => {
  return request({
    url: `/api/menu/${id}`,
    method: 'delete',
  })
}

export const menuAddApi = (data: IMenu) => {
  return request({
    url: `/api/menu`,
    method: 'post',
    data,
  })
}

export const menuUpdateApi = (id: string | number, data: IMenu) => {
  return request({
    url: `/api/menu/${id}`,
    method: 'put',
    data,
  })
}
