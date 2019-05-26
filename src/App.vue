<template>
  <div id="app">
    <h1 class="title"><router-link :to="{name: 'tasks-board'}">TaskManager</router-link></h1>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
}
</script>
<style lang="scss">
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  a {
    text-decoration: none;
  }
}
</style>
<style lang="scss" scoped>
#app {
  .title {
    font-size: 22px;
    margin: 10px auto;
    text-align: center;
    > a {
      color: inherit;
      text-decoration: none;
    }
  }
}
</style>
