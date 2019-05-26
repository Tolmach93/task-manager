<template>
  <tasks-table-view
    :tasks="sortedTasks"
    :sortTasksBy="sortTasksBy"
    :sortTasksDirectionUpToDown="sortTasksDirectionUpToDown"
    @change-sort="setSort"/>
</template>
<script>

import { createNamespacedHelpers } from 'vuex'

import { STORE_MODULES } from '@/constants'
import TasksTableView from '@/views/tasks/all/table/components/tasks-table-view'

const { mapGetters, mapState, mapMutations } = createNamespacedHelpers(STORE_MODULES.TASKS)

export default {
  name: 'tasks-table',
  components: { TasksTableView },
  computed: {
    ...mapState(['sortTasksBy', 'sortTasksDirectionUpToDown']),
    ...mapGetters(['sortedTasks']),
  },
  methods: {
    ...mapMutations(['setSort'])
  }
}
</script>
