<template>
  <div class="h-screen bg-gray-500 font-mono">
    <!-- auth thn idea mou edwse o tilemaxos -->
    <router-view/>
    <BurgerMenu style="z-index: 1;" @logout="logout" :user="user" class="fixed bottom-0 left-0"/>
  </div>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'

import authService from '../boot/auth'
import { useUserStore } from '../store/loggedUser'

import BurgerMenu from '../components/BurgerMenu.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    BurgerMenu
  },
  setup () {
    const user = computed(() => useUserStore())

    const logout = () => {
      authService.logout()
    }

    onMounted(() => {
      if (useUserStore().id === '') {
        authService.login()
      }
    })

    return {
      user,
      logout
    }
  }
})
</script>
