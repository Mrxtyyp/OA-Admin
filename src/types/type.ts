export interface MenuIneterface {
  parentId: number
  id: string
  type: string
  name: string
  path: string
  icon?: string
  code?: string
  order?: string
  children: MenuIneterface[] | undefined
  action?: MenuIneterface[]
}

export type IMenu = Omit<MenuIneterface, 'children' | 'action' | 'id'>

export interface UserInterface {
  userId: string
  userName: string
  userPwd: string
  userEmail: string
  mobile: string
  sex: number
  job: string
  state: string
  role: string
  token?: string
}

// 分页参数
export interface PageParams {
  page: number
  size: number
}

export interface IRole {
  id?: string
  name: string
  remark?: string
  permission: string
}
