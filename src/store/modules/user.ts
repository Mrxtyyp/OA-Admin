import type { UserInterface } from '@/types/type'
import { defineStore } from 'pinia'
import { UserStoreInterface } from './types'

export const useUserStore = defineStore('user', {
  state: (): UserStoreInterface => {
    return {
      userInfo: <UserInterface>{},
    }
  },

  actions: {
    setUserInfo(user: UserInterface) {
      this.userInfo = user
    },
  },
})
