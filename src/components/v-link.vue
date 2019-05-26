<template>
  <router-link
    class="link"
    v-bind="$attrs"><slot/></router-link>
</template>
<script>
export default {
  name: 'v-link'
}
</script>
<style scoped lang="scss">
.link {
  font-weight: 700;
  color: black;
  cursor: pointer;
  transition: color 0.2s;
  &.router-link-active,
  &:hover {
    color: green;
  }
}
</style>
