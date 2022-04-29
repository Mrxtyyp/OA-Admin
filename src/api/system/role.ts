import request from '@/service'

export const getRoleList = () => {
  return request({
    url: '/api/role/list',
    method: 'get',
  })
}
