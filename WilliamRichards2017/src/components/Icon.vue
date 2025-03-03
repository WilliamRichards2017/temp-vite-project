<template>
  <svg
    :viewBox="'0 0 24 24'"
    :width="size"
    :height="size"
    :fill="color"
    :class="['', { 'hover': hover }]"
  >
    <path :d="path" />
  </svg>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  path: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
  color: { type: String, default: 'currentColor' },
  hover: { type: Boolean, default: true }
})
</script>

<style scoped>
svg.hover:hover {
  fill: rgb(var(--v-theme-primary));
}
.no-hover:hover {
  fill: unset;
}
.inline-block {
  display: inline-block;
}
.align-middle {
  vertical-align: middle;
}
</style>
