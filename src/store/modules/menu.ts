import { MenuIneterface } from '@/types/type'
import { defineStore } from 'pinia'
import { MenuStoreInterface } from './types'

export const useMenuStore = defineStore('menu', {
  state: (): MenuStoreInterface => {
    return {
      menuList: [],
    }
  },

  actions: {
    setMenuList(menuList: MenuIneterface[]) {
      this.menuList = menuList
    },
  },
})
