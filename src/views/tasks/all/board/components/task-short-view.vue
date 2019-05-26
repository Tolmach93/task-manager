<template>
  <router-link v-bind="$attrs" :to="to" class="task-short">{{ task.title }}</router-link>
</template>
<script>
export default {
  name: 'task-short-view',
  props: {
    task: {
      type: Object,
      required: true,
    }
  },
  computed: {
    to () {
      return {
        name: 'tasks-single',
        params: {
          id: this.task.id
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.task-short {
  display: block;
  color: inherit;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 3px 10px;
  cursor: pointer;
}
</style>
