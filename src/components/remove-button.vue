<template>
  <div
    class="remove-button"
    :class="{active}"
    @click="$emit('click', $event)"
    @mouseover="active = true"
    @mouseout=" active = false">
    <icon-trash :color="color"/>
  </div>
</template>

<script>
import IconTrash from '@/components/icons/icon-trash'
export default {
  name: 'remove-button',
  components: { IconTrash },
  data () {
    return {
      active: false
    }
  },
  computed: {
    color () {
      return this.active ? 'green' : 'black'
    }
  }
}
</script>

<style scoped lang="scss">
.remove-button {
  width: 20px;
  min-width: 20px;
  height: 20px;
  padding: 3px;
  border-radius: 5px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0);
  border: 2px solid white;
  transition: background 0.2s;
  &.active {
    background: rgba(255, 255, 255, 1);
  }
}
</style>
