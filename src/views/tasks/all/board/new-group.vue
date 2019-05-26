<template>
  <group-view
    :group="group"
    @edit-group="addGroupLocal"/>
</template>
<script>

import { createNamespacedHelpers } from 'vuex'

import { STORE_MODULES } from '@/constants'
import GroupView from './components/group-view'

const { mapMutations } = createNamespacedHelpers(STORE_MODULES.GROUPS)

function getNewGroup () {
  return {
    id: Date.now(),
    title: '',
    tasks: []
  }
}

export default {
  name: 'new-group',
  components: { GroupView },
  data () {
    return {
      group: getNewGroup()
    }
  },
  methods: {
    ...mapMutations(['addGroup']),
    addGroupLocal (group) {
      if (!group.title) return
      this.group.title = group.title
      this.addGroup(this.group)
      this.group = getNewGroup()
    }
  }
}
</script>
