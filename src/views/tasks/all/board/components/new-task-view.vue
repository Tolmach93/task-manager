<template>
  <div class="new-task">
    <input
      class="input"
      placeholder="New task"
      v-model="title"
      @blur="saveTask">
  </div>
</template>
<script>
export default {
  name: 'new-task-view',
  data () {
    return {
      title: '',
    }
  },
  methods: {
    saveTask () {
      if (!this.title.length) return
      this.$emit('create-task', this.title)
      this.title = ''
    }
  }
}
</script>
<style scoped lang="scss">
.new-task {
  margin: 10px 0;
  padding: 0 10px;
  .input {
    box-sizing: border-box;
    width: 100%;
  }
}
</style>
