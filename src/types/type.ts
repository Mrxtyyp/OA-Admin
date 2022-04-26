export interface MenuIneterface {
  parentId: string
  _id: number
  menuType: number
  menuName: string
  menuCode: string
  path?: string
  icon?: string
  order?: string
  component?: string
  children?: MenuIneterface[]
  action?: MenuIneterface[]
}

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
