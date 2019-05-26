<template>
  <div
    class="groups"
    :style="style">
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'groups-view',
  data () {
    return {
      style: {
        height: 0
      }
    }
  },
  methods: {
    setHeight () {
      const offsetTop = this.$el.offsetTop
      this.style.height = `${document.documentElement.clientHeight - offsetTop}px`
    },
  },
  mounted () {
    this.setHeight()
    window.addEventListener('resize', this.setHeight, false)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setHeight, false)
  }
}
</script>
<style scoped lang="scss">
.groups {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 10px;
}
</style>
