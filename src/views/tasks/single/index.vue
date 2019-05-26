<template>
  <task-view
    :task="task"
    :groups="groups"
    @set-task="setTaskLocal"
    @remove-task="removeTaskLocal"/>
</template>
<script>

import { createNamespacedHelpers } from 'vuex'

import { STORE_MODULES } from '@/constants'
import TaskView from '@/views/tasks/single/components/task-view'

const { mapState, mapMutations } = createNamespacedHelpers(STORE_MODULES.TASKS)

export default {
  name: 'tasks-single',
  components: { TaskView },
  props: {
    id: {
      type: [String, Number],
      required: true,
    }
  },
  computed: {
    ...mapState({
      tasks: 'data',
    }),
    groups () {
      return this.$store.state[STORE_MODULES.GROUPS]
    },
    task () {
      return this.tasks[+this.id]
    }
  },
  methods: {
    ...mapMutations(['setTask', 'removeTask']),
    setTaskLocal (task) {
      if (this.task.groupId !== task.groupId) {
        this.$store.commit(STORE_MODULES.GROUPS + '/removeTaskInGroup', task.id)
        this.$store.commit(STORE_MODULES.GROUPS + '/addTaskToGroup', { groupId: task.groupId, taskId: task.id })
      }
      this.setTask(task)
    },
    removeTaskLocal (id) {
      this.$store.commit(STORE_MODULES.GROUPS + '/removeTaskInGroup', id)
      this.removeTask(id)
      this.$router.push({
        name: 'tasks-board'
      })
    }
  }
}
</script>
