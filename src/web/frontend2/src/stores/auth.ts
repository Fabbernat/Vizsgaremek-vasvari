import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    currentView: 'login' as 'login' | 'register',
    username: 'Sifu Mester'
  }),
  actions: {
    login(username: string) {
      this.username = username
      this.isLoggedIn = true
    },
    register(username: string, email: string) {
      this.username = username
      this.isLoggedIn = true
    },
    logout() {
      this.isLoggedIn = false
      this.username = ''
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
