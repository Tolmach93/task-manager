<template>
  <div class="group">
    <div class="head">
      <transition appear :css="false" @enter="enterInput">
        <input
          v-if="editing"
          class="input"
          type="text"
          v-model="title"
          @blur="saveTitle">
      </transition>
      <template v-if="editing === false">
        <div class="title" @click="editTitle">{{ group.title ? group.title : 'Untitled' }}</div>
        <remove-button
          v-if="canRemove"
          class="remove-button"
          @click.stop="$emit('remove-group', group)"/>
      </template>
    </div>
    <slot/>
  </div>
</template>

<script>

import RemoveButton from '@/components/remove-button'

export default {
  name: 'group-view',
  components: { RemoveButton },
  data () {
    return {
      editing: false,
      title: ''
    }
  },
  props: {
    group: {
      type: Object,
      required: true,
    },
    canRemove: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    enterInput (el) {
      if (el.tagName !== 'INPUT') return
      el.focus()
    },
    editTitle () {
      this.title = this.group.title
      this.editing = true
    },
    saveTitle () {
      this.$emit('edit-group', {
        id: this.group.id,
        title: this.title,
      })
      this.editing = false
    }
  }
}
</script>

<style scoped lang="scss">
.group {
  width: 250px;
  min-width: 250px;
  margin-right: 10px;
  padding: 10px 0;
  border-radius: 5px;
  background: #e2e2e0;

  &:last-of-type {
    margin-right: 0;
  }

  .input {
    font-size: 18px;
    padding: 3px 5px;
    flex-grow: 1;
  }

  .head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 10px 0;
    padding: 0 10px;
    .title {
      line-height: 30px;
      font-size: 18px;
      font-weight: 600;
      flex-grow: 1;
    }

    .remove-button {
      margin-left: 10px;
    }
  }
}
</style>
