<template>
  <div :class="visibleComponent ? 'grid-cols-12 transform duration-200 hover:-translate-x-2 ease-in' : 'grid-cols-1 '" class="shadow-lg grid ">
    <div v-if="visibleComponent" class="col-span-11 bg-gray-600">
      <div class="pl-3 text-gray-300 grid grid-rows-5">
        <div class="text-center p-6 row-span-1">
          <div class="rounded-full text-gray-300 -mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 rounded-full mx-auto" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
            </svg>
          </div>
          <p class="pt-2 text-lg font-semibold">{{ user.name }}</p>
          <p class="text-sm text-gray-300">{{ user.email }}</p>
        </div>

        <div class="row-span-3 self-start">
          <router-link to="/home" class="px-4 py-2 m-1 flex justify-start items-center rounded-xl bg-gray-500 hover:bg-gray-400 flex hover:shadow hover:shadow-xl ">
            <div class="text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div class="pl-3">
              <p class="font-medium text-gray-300 leading-none">Task Lists</p>
            </div>
          </router-link>
          <router-link to="/completed" href="/completed" class="px-4 flex justify-start items-center py-2 m-1 rounded-xl bg-gray-500 hover:bg-gray-400 flex hover:shadow hover:shadow-xl">
            <div class="text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="pl-3">
              <p class="font-medium text-gray-300 leading-none">Completed Lists</p>
            </div>
          </router-link>
          <router-link to="/yourLists" class="px-4 flex justify-start items-center py-2 m-1 rounded-xl bg-gray-500 hover:bg-gray-400 flex hover:shadow hover:shadow-xl">
            <div class="text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div class="pl-3">
              <p class="font-medium text-gray-300 leading-none">Your Lists</p>
            </div>
          </router-link>
        </div>

        <div class="row-span-1 self-end">
          <button @click="logout" clickable class="px-5 py-3 w-full cursor-pointer mb-4 items-center flex justify-start rounded-xl bg-gray-500 hover:bg-purple-500 flex justify-start hover:shadow hover:shadow-xl">
            <div class="text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <div class="pl-3 text-center ">
              <p class="text-xl font-medium text-gray-300 leading-none">Logout</p>
            </div>
          </button>
        </div>
      </div>
    </div>
    <!-- hide/unhide side menu -->
    <div v-if="visibleComponent" href="" class="col-span-1 border-r-2 border-gray-400 w-xs m-0 bg-gray-600 text-gray-300 flex items-center cursor-pointer" @click="visibleComponent = false">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transform duration-200 hover:scale-150 hover:-translate-x-1 ease-in" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
      </svg>
    </div>
    <div v-if="!visibleComponent" style="width: 18px" class="transform duration-200 hover:scale-150 hover:translate-x-1 ease-in col-span-1 border-r-2 border-gray-400 w-xs h-screen m-0 bg-gray-600 text-gray-300 flex items-center cursor-pointer" @click="visibleComponent = true">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import User from '../interfaces/User'

export default defineComponent({
  name: 'BurgerMenu',
  props: {
    user: {
      type: Object as PropType<User>
    }
  },
  setup (_, { emit }) {
    const visibleComponent = ref(false)

    const logout = () => {
      emit('logout')
    }

    return {
      visibleComponent,
      logout
    }
  }
})
</script>
