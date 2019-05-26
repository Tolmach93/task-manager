<template>
  <tasks-all-view :links="links">
    <router-view></router-view>
  </tasks-all-view>
</template>
<script>

import TasksAllView from './components/tasks-all-view'

export default {
  name: 'tasks-all',
  components: { TasksAllView },
  data () {
    return {
      links: [
        {
          id: 1,
          to: {
            name: 'tasks-board',
          },
          title: 'Board',
          exact: true,
        },
        {
          id: 2,
          to: {
            name: 'tasks-table',
          },
          title: 'Table',
          exact: true,
        },
      ]
    }
  }
}
</script>
