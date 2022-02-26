<template>
  <div class="flex flex-wrap justify-start p-5">
    <div v-for="list in lists" :key="list.id">
      <ListCard
        :list="list"
        @updateLists="updateLists"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import ListCard from '../components/ListCard.vue'

import List from '../interfaces/List'

export default defineComponent({
  name: 'ListsGroup',
  emits: ['updateLists'],
  components: {
    ListCard
  },
  props: {
    lists: {
      type: Object as PropType<List>,
      require: true
    }
  },
  setup (_, { emit }) {
    const updateLists = () => {
      emit('updateLists')
    }

    return {
      updateLists
    }
  }
})
</script>
