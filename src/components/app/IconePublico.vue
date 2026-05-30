<template>
  <span class="public-icon" :style="iconStyle" aria-hidden="true" />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
})

const sizeValue = computed(() => {
  return typeof props.size === 'number' ? `${props.size}px` : props.size
})

const iconStyle = computed(() => ({
  '--icon-url': `url("${props.src}")`,
  '--icon-size': sizeValue.value,
}))
</script>

<style scoped>
.public-icon {
  display: inline-block;
  width: var(--icon-size);
  height: var(--icon-size);
  flex: 0 0 auto;
  vertical-align: -0.125em;
  background-color: currentColor;
  mask: var(--icon-url) no-repeat center / contain;
  -webkit-mask: var(--icon-url) no-repeat center / contain;
}
</style>
