<template>
  <loader v-if="loading"/>
  <error
    v-else-if="error"
    :text="error"
    @reload="load"/>
  <router-view v-else/>
</template>
<script>

import { createNamespacedHelpers } from 'vuex'

import Loader from '@/components/loader'
import Error from '@/components/error'
import { STORE_MODULES } from '@/constants'

const { mapActions, mapState } = createNamespacedHelpers(STORE_MODULES.TASKS)

export default {
  name: 'tasks',
  components: { Error, Loader },
  computed: {
    ...mapState([
      'loading',
      'error',
    ]),
  },
  methods: {
    ...mapActions(['load']),
  },
  created () {
    this.load()
  }
}
</script>
