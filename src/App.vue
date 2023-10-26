<script lang="ts" setup>
import Index from "./views/Index.vue";
import { ConfigProvider } from "@arco-design/web-vue";
</script>

<template>
  <ConfigProvider :size="'small'">
    <Index />
  </ConfigProvider>
</template>

<style lang="less" scoped></style>
