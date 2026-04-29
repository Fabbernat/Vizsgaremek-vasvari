import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    show: false,
    message: '',
    type: 'success'
  }),

  actions: {
    notify(message, type = 'success') {
      this.message = message
      this.type = type
      this.show = true

      setTimeout(() => {
        this.show = false
      }, 3000)
    }
  }
})