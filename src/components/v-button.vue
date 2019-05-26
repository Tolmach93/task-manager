<template>
  <div
    class="button"
    :class="[color, disabled ? 'disabled' : null]"
    @click="click">{{ text }}</div>
</template>

<script>
export default {
  name: 'v-button',
  props: {
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'green',
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    click (e) {
      if (this.disabled) return
      this.$emit('click', e)
    }
  }
}
</script>
<style scoped lang="scss">
.button {
  box-sizing: border-box;
  max-width: 200px;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 7px;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  color: white;
  &.green {
    background: green;
  }
  &.red {
    background: red;
  }
  &.disabled {
    background: gray;
  }
}
</style>
