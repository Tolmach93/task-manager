<template>
  <groups-view v-drag-and-drop:options="dragAndDropOptions">
    <group-view
      v-for="group in groups"
      :key="group.id"
      :group="group"
      :can-remove="!group.tasks.length"
      @edit-group="editGroup"
      @remove-group="removeGroup($event.id)">
      <vue-draggable-group
        itemsKey="tasks"
        :value="group.tasks"
        :groups="groups"
        :data-id="group.id"
        @change="updateGroupsLocal"
        @input="updateTasksInGroups($event, group.id)">
        <div class="drag-inner-list" :data-id="group.id">
          <div
            v-for="task in group.tasks"
            class="drag-item"
            :key="task.id"
            :data-id="task.id">
            <task-short-view :task="task"/>
          </div>
        </div>
      </vue-draggable-group>
      <new-task :group-id="group.id"/>
    </group-view>
    <new-group/>
  </groups-view>
</template>
<script>

import { createNamespacedHelpers } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'

import { STORE_MODULES } from '@/constants'
import GroupView from './components/group-view'
import GroupsView from './components/groups-view'
import NewGroup from './new-group'
import NewTask from './new-task'
import TaskShortView from './components/task-short-view'

const { mapGetters, mapMutations } = createNamespacedHelpers(STORE_MODULES.GROUPS)

export default {
  name: 'tasks-board',
  components: { TaskShortView, NewTask, NewGroup, GroupsView, GroupView },
  data () {
    return {
      dragAndDropOptions: {
        dropzoneSelector: '.drag-inner-list',
        draggableSelector: '.drag-item',
      },
      groups: []
    }
  },
  watch: {
    getGroupsWithTasks () {
      this.groups = cloneDeep(this.getGroupsWithTasks)
    },
  },
  computed: {
    ...mapGetters(['getGroupsWithTasks']),
  },
  methods: {
    ...mapMutations(['removeGroup', 'editGroup', 'updateGroups']),
    updateTasksInGroups (tasks, groupId) {
      const group = this.groups.find(group => group.id === groupId)
      group.tasks = tasks
      this.updateGroupsLocal(this.groups)
    },
    updateGroupsLocal (groups) {
      const allTasks = this.$store.state[STORE_MODULES.TASKS].data
      this.updateGroups(groups.reduce((groups, group) => {
        const tasks = group.tasks.map(task => {
          if (allTasks[task.id].groupId !== group.id) {
            this.$store.commit(STORE_MODULES.TASKS + '/setTask', {
              ...allTasks[task.id],
              groupId: group.id
            })
          }
          return task.id
        })
        groups[group.id] = {
          ...group,
          tasks
        }
        return groups
      }, {}))
    }
  },
  created () {
    this.groups = cloneDeep(this.getGroupsWithTasks)
  }
}
</script>
<style scoped lang="scss">

.drag-inner-list {
  padding: 10px 0;
  .drag-item {
    &[aria-grabbed="true"] {
      background: green;
      color: #fff;
    }
  }
}
</style>
<style lang="scss">
@keyframes nodeInserted {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 0.8;
  }
}

.item-dropzone-area {
  height: 22px;
  background: #888;
  opacity: 0.8;
  animation-duration: 0.5s;
  animation-name: nodeInserted;
}
</style>
