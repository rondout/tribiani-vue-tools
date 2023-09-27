<script lang="ts" setup>
import OrgLaneChart from "../../lib/components/org-lane-chart/OrgLaneChart.vue";
import { orgDatas } from "./data";
</script>

<template>
  <org-lane-chart :treeData="orgDatas">
    <template #title="{ data }">{{ data.id }}</template>
    <template #content="{ data }">
      <p>{{ data.label }}</p>
    </template>
  </org-lane-chart>
</template>

<style lang="less" scoped></style>
