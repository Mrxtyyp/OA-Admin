import { MenuIneterface, UserInterface } from '@/types/type'

export interface CountInterface {
  count: number
}

export interface UserStoreInterface {
  userInfo: UserInterface
}

export interface MenuStoreInterface {
  menuList: MenuIneterface[]
}
