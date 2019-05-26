<template>
  <svg class="loader" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
    <circle class="path" fill="none" stroke-width="5" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
  </svg>
</template>

<script>
export default {
  name: 'loader'
}
</script>

<style scoped lang="scss">
@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 46.75;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
}

.loader .path {
  stroke: green;
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash 1.4s ease-in-out infinite;
}

.loader {
  animation: rotator 1.4s linear infinite;
  width: 70px;
  height: 70px;
  margin: 40px auto;
  display: block;
}
</style>
