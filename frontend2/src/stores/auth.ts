import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    currentView: 'login' as 'login' | 'register'
  }),
  actions: {
    login() {
      this.isLoggedIn = true
    },
    logout() {
      this.isLoggedIn = false
      this.currentView = 'login'
    },
    switchToRegister() {
      this.currentView = 'register'
    },
    switchToLogin() {
      this.currentView = 'login'
    }
  }
})
