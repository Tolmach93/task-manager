<template>
  <new-task-view @create-task="createTask"/>
</template>
<script>

import { mapMutations } from 'vuex'
import NewTaskView from './components/new-task-view'
import { getDefaultTaskProps } from '@/utils'
import { STORE_MODULES } from '@/constants'

export default {
  name: 'new-task',
  components: { NewTaskView },
  props: {
    groupId: {
      type: Number,
      required: true,
    }
  },
  methods: {
    ...mapMutations(STORE_MODULES.TASKS, ['setTask']),
    ...mapMutations(STORE_MODULES.GROUPS, ['addTaskToGroup']),
    createTask (title) {
      const task = {
        ...getDefaultTaskProps(),
        title,
        groupId: this.groupId,
      }
      this.setTask(task)
      this.addTaskToGroup({
        taskId: task.id,
        groupId: task.groupId,
      })
    }
  }
}
</script>
<style scoped>

</style>
