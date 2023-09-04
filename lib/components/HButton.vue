<script lang="ts" setup>
import { CSSProperties, computed } from "vue";

const props = defineProps<{ backgroundColor?: string; color?: string }>();

const styleObj = computed<CSSProperties>(() => {
  return {
    backgroundColor: props.backgroundColor || "#3f51b5",
    color: props.color,
  };
});
</script>

<template>
  <button class="h-button" :style="styleObj">
    <slot>this is default button</slot>
  </button>
</template>

<style lang="css" scoped></style>
