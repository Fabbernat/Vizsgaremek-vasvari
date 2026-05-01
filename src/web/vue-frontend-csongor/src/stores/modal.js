// import { defineStore } from 'pinia'

// export const useModalStore = defineStore('modal', {
//   state: () => ({
//     isOpen: false,
//     component: null,
//     props: {}
//   }),

//   actions: {
//     open(component, props = {}) {
//       this.component = component
//       this.props = props
//       this.isOpen = true
//     },

//     close() {
//       this.isOpen = false
//       this.component = null
//       this.props = {}
//     }
//   }
// })

import { defineStore } from 'pinia'
import { markRaw } from 'vue'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isOpen: false,
    component: null,
    props: {}
  }),

  actions: {
    open(component, props = {}) {
      this.component = markRaw(component) // 🔥 EZ A FIX
      this.props = props
      this.isOpen = true
    },

    close() {
      this.isOpen = false
      this.component = null
      this.props = {}
    }
  }
})