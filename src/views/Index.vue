<script setup lang="ts">
import Revalidate from "./Revalidate.vue";
import LaneChart from "./LaneChart.vue";
</script>

<template>
  <a-tabs default-active-key="1">
    <a-tab-pane key="1" title="Lane Chart">
      <LaneChart />
    </a-tab-pane>
    <a-tab-pane key="2" title="Revalidate">
      <Revalidate />
    </a-tab-pane>
    <!-- <a-tab-pane key="3">
      <template #title>Tab 3</template>
      Content of Tab Panel 3
    </a-tab-pane> -->
  </a-tabs>
</template>
