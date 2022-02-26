<template>
  <!-- loading thingy
  <div class="flex items-center justify-center w-full">
    <div class="flex justify-center items-center text-sm">
      <svg class="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
        <path clip-rule='evenodd'
          d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
          fill='currentColor' fill-rule='evenodd' />
      </svg>
      <div>Loading ...</div>
    </div>
  </div> -->
  <div>
    <div class="bg-gray-500 flex items-center justify-center font-mono">
      <div class="flex flex-col">
        <!-- create list/tasks panel -->
        <div class="mr-10 ml-10 ">
          <h1 class="text-3xl text-gray-100 pt-10 pb-3">Create a List:</h1>
          <div>
            <CreateListTasks @refetchListData="refetchListData"/>
          </div>
        </div>
        <!-- show list/tasks panel -->
        <div>
          <h1 class="text-3xl text-gray-100 pt-10 pb-3">Todos:</h1>
          <ListsGroup @updateLists="refetchListData" :lists="lists"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'

import { useQuery } from '@vue/apollo-composable'
import { getLists } from '../assets/gql/list.queries'

import CreateListTasks from '../components/CreateListTasks.vue'
import ListsGroup from '../components/ListsGroup.vue'

export default defineComponent({
  name: 'Home',
  components: {
    CreateListTasks,
    ListsGroup
  },
  setup () {
    const { result: listRes, refetch: refetchListData } = useQuery(getLists)

    const lists = computed(
      () => listRes.value ? listRes.value.lists : []
    )

    onMounted(() => {
      refetchListData()
    })

    return {
      lists,
      refetchListData
    }
  }
})
</script>
