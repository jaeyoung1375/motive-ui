import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
  }),

  actions: {
    setLoggedIn(status: boolean) {
      this.isLoggedIn = status
    },
  },

  persist: true,
})
