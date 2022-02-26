import { defineStore } from 'pinia'
import User from '../interfaces/User'

export const useUserStore = defineStore({
  id: 'loggedUser',
  state: () => {
    const id = ''
    const name = ''
    const email = ''

    return {
      id,
      name,
      email
    }
  },
  actions: {
    /**
     * @param {User} user
     */
    addUser(userLogged: any) {
      this.$patch({
        id: userLogged.sub,
        name: userLogged.name,
        email:userLogged.email
      })
    },
    removeUser() {
      this.$reset()
    }
  },
})
