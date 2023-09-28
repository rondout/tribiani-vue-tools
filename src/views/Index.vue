<script lang="ts" setup>
import OrgLaneChart from "../../lib/components/org-lane-chart/OrgLaneChart.vue";
import { orgDatas } from "./data";
</script>

<template>
  <org-lane-chart :treeData="orgDatas">
    <template #title="{ data }">
      <div class="tree-title">{{ data.id }}</div>
    </template>
    <template #content="{ data }">
      <p>{{ data.label }}</p>
    </template>
    <template #expand-icon>
      <div class="action-icon expand-icon"></div>
    </template>
    <template #collapse-icon>
      <div class="action-icon collapse-icon"></div>
    </template>
  </org-lane-chart>
</template>

<style lang="less" scoped>
.tree-title {
  background-color: #fff;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 12px;
  background-image: url("../assets/org-title-bg.svg");
}
.action-icon {
  height: 18px;
}
.collapse-icon {
  background-image: url("../assets/arrow-left.svg");
}
.expand-icon {
  background-image: url("../assets/arrow-left.svg");
  transform: rotate(180deg);
}
</style>

<style lang="less">
.org-item-content:hover {
  .tree-title {
    background-color: #376af6;
    background-image: none;
    color: #fff;
  }
  .action-icon {
    height: 18px;
  }
  .collapse-icon {
    background-image: url("../assets/white-arrow-left.svg");
  }
  .expand-icon {
    background-image: url("../assets/white-arrow-left.svg");
    transform: rotate(180deg);
  }
}
</style>
