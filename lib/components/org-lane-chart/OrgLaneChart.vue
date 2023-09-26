<script lang="ts" setup>
import { orgDatas, ExpanClickInjectionKey, OrgTree, parseTreeLevel } from "./data";
import OrgLaneItem from "./OrgLaneItem.vue";
import "../main.css";
import { deepClone } from "../../tools";
import { provide } from "vue";
import { ref } from "vue";
import { computed } from "vue";

// const state = reactive({
//   elId: "lane-chart-container",
// });

// const data = ref(deepClone(orgDatas));
const collapsedIds = ref<(string | number)[]>([]);

const displayedData = computed<OrgTree[]>(() => {
  const newTreeData = deepClone(orgDatas);
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

const labelAndLevel =computed(() => {
    return parseTreeLevel(displayedData.value)
})
</script>

<template>
  <div id="lane-chart-container">
    <p>{{ labelAndLevel }}</p>
    <OrgLaneItem :data="displayedData"></OrgLaneItem>
  </div>
</template>

<style lang="less" scoped>
#lane-chart-container {
  min-width: 1080px;
  min-height: 600px;
  //   background-color: #d9d9d9;
  padding: 16px;
}
</style>
