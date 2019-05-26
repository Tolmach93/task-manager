<template>
  <div class="tasks-all">
    <div class="links">
      <v-link
        v-for="link in links"
        class="link"
        :key="link.id"
        :to="link.to"
        :exact="link.exact">{{ link.title }}
      </v-link>
    </div>
    <slot/>
  </div>
</template>
<script>

import VLink from '@/components/v-link'
export default {
  name: 'tasks-all-view',
  components: { VLink },
  props: {
    links: {
      type: Array,
      required: true
    }
  }
}
</script>
<style scoped lang="scss">
.tasks-all {
  .links {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 0;
    .link {
      white-space: nowrap;
      padding: 7px 10px;
    }
  }
}
</style>
