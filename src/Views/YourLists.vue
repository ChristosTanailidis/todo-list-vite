<template>
  <div>
    <div class="bg-gray-500 flex items-center justify-center font-mono">
      <div class="flex flex-col">
        <div>
          <h1 class="text-3xl text-gray-100 pt-10 pb-3">{{ usersName }}'s todos:</h1>
          <ListsGroup @updateLists="refetchListData()" :lists="yourLists()"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'

import { useQuery } from '@vue/apollo-composable'
import { getLists } from '../assets/gql/list.queries'

import ListsGroup from '../components/ListsGroup.vue'
import List from '../interfaces/List'
import { useUserStore } from '../store/loggedUser'

export default defineComponent({
  name: 'CompletedLists',
  components: {
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

    // todo: make it better
    const yourLists = ref(
      () => {
        if (listRes.value) {
          const temp = listRes.value.lists
          const tempYourList: List[] = []
          temp.forEach((list: any) => {
            if (list.owner.id === useUserStore().id) {
              tempYourList.push(list)
            }
          })
          return tempYourList
        } else {
          return []
        }
      }
    )

    const usersName = ref(useUserStore().name)

    return {
      lists,
      refetchListData,

      usersName,
      yourLists
    }
  }
})
</script>
