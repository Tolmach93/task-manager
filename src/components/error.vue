<template>
  <div class="error">
    <div class="text">{{ text }}</div>
    <v-button class="button" text="reload" @click="$emit('reload')"/>
  </div>
</template>
<script>
import VButton from '@/components/v-button'

export default {
  name: 'error',
  components: { VButton },
  props: {
    text: {
      type: [String, Error],
      default: 'Server error'
    }
  }
}
</script>
<style scoped lang="scss">
.error {
  .text {
    text-align: center;
  }
  .button {
    margin: 10px auto;
  }
}
</style>
