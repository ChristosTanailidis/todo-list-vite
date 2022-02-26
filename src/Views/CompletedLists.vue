<template>
  <div class="bg-gray-500 flex flex-col items-center justify-center font-mono">
    <div class="flex flex-col">
      <!-- show completed list/tasks panel -->
      <div>
        <h1 class="text-3xl text-gray-100 pt-10 pb-3">Todos:</h1>
        <ListsGroup @updateLists="refetchCompletedListData" :lists="completedLists"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'

import { useQuery } from '@vue/apollo-composable'
import { getCompletedLists } from '../assets/gql/list.queries'

import ListsGroup from '../components/ListsGroup.vue'

export default defineComponent({
  name: 'CompletedLists',
  components: {
    ListsGroup
  },
  setup () {
    const { result: completedListsRes, refetch: refetchCompletedListData } = useQuery(getCompletedLists)

    const completedLists = computed(
      () => completedListsRes.value ? completedListsRes.value.completedLists : []
    )

    onMounted(() => {
      refetchCompletedListData()
    })

    return {
      completedLists,
      refetchCompletedListData
    }
  }
})
</script>
