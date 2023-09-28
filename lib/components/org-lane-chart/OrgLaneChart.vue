<script lang="ts" setup>
import { ExpanClickInjectionKey, OrgTree, parseTreeLevel } from "./data";
import OrgLaneItem from "./OrgLaneItem.vue";
import "../main.css";
import { deepClone } from "../../tools";
import { provide } from "vue";
import { ref } from "vue";
import { computed } from "vue";

const props = defineProps<{ treeData: OrgTree[] }>();

// const state = reactive({
//   elId: "lane-chart-container",
// });

// const data = ref(deepClone(orgDatas));
const collapsedIds = ref<(string | number)[]>([]);

const displayedData = computed<OrgTree[]>(() => {
  const newTreeData = deepClone(props.treeData);
  const checkCollapsed = (treeDatas: OrgTree[]) => {
    treeDatas.forEach((item) => {
      item.hasChild = item.children?.length > 0;
      if (collapsedIds.value?.includes(item.id)) {
        item.collapsed = true;
        delete item.children;
      }
      if (item.children?.length) {
        checkCollapsed(item.children);
      }
    });
  };
  checkCollapsed(newTreeData);
  return newTreeData;
});

const handleExpandClick = (id: string | number, isCollapse: boolean) => {
  console.log(id, isCollapse);
  if (isCollapse) {
    collapsedIds.value.push(id);
  } else {
    collapsedIds.value = collapsedIds.value.filter((v) => v !== id);
  }
};

provide(ExpanClickInjectionKey, handleExpandClick);

const labelAndLevel = computed(() => {
  return parseTreeLevel(displayedData.value);
});

const parseLeftDistance = (index: number): number => {
  if (!index) {
    return 16;
  }
  return index * 216 + (index + 1) * 16;
};
</script>

<template>
  <div id="lane-chart-container">
    <div
      v-for="(levelData, index) of labelAndLevel.labels || []"
      :style="{ left: parseLeftDistance(index) + 'px' }"
      :key="levelData"
      class="lane-bg-item"
    >
      <div class="flex-center title">{{ levelData }}</div>
    </div>
    <OrgLaneItem :data="displayedData">
      <template #title="{ data }">
        <slot name="title" :data="(data as OrgTree)"> </slot>
      </template>
      <template #content="{ data }">
        <slot name="content" :data="(data as OrgTree)"> </slot>
      </template>

      <template #expand-icon>
        <slot name="expand-icon"> </slot>
      </template>
      <template #collapse-icon>
        <slot name="collapse-icon"> </slot>
      </template>
    </OrgLaneItem>
  </div>
</template>

<style lang="less" scoped>
#lane-chart-container {
  /* min-width: 1080px; */
  min-height: 600px;
  width: 100%;
  padding: 16px;
  padding-top: 40px;
  box-sizing: border-box;
  position: relative;
  // background: rgba(128, 119, 119, 0.231);
  .lane-bg-item {
    background-color: #ecf0fb;
    position: absolute;
    top: 0;
    height: 100%;
    width: 216px;
    .title {
      height: 36px;
      border-bottom: 1px solid #f8f9fb;
    }
  }
  .lane-bg-item:nth-child(2n-1) {
    background-color: #f8f9fb;
  }
}
</style>
