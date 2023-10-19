<script lang="ts" setup generic="T extends string | number = number">
import {
  ExpanClickInjectionKey,
  OrgTree,
  parseTreeLevel,
  OrgFieldNames,
  FieldNamesInjectionKey,
} from "./data";
import OrgLaneItem from "./OrgLaneItem.vue";
import "../main.css";
import { deepClone } from "../../tools";
import { provide } from "vue";
import { ref } from "vue";
import { computed } from "vue";

const props = defineProps<{
  treeData: OrgTree<T>[];
  id?: string;
  fieldNames?: OrgFieldNames;
}>();

// const state = reactive({
//   elId: "lane-chart-container",
// });

// const data = ref(deepClone(orgDatas));
const collapsedIds = ref<(string | number)[]>([]);

const displayedData = computed<OrgTree<T>[]>(() => {
  const newTreeData = deepClone(props.treeData);
  const checkCollapsed = (treeDatas: OrgTree<T>[]) => {
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
provide(FieldNamesInjectionKey, {
  id: props.fieldNames?.id || "id",
  children: props.fieldNames?.children || "children",
  label: props.fieldNames?.label || "label",
  type: props.fieldNames?.type || "type",
  isEmptyItem: props.fieldNames.isEmptyItem || "isEmptyItem",
});

const labelAndLevel = computed(() => {
  return parseTreeLevel(displayedData.value, props.fieldNames?.type || "type");
});

const parseLeftDistance = (index: number): number => {
  if (!index) {
    return 0;
  }
  return index * 216 + index * 16;
};
</script>

<template>
  <div :id="props.id">
    <div id="lane-chart-container">
      <div
        v-for="(levelData, index) of labelAndLevel.labels || []"
        :style="{ left: parseLeftDistance(index) + 'px' }"
        :key="levelData"
        class="lane-bg-item"
      >
        <div class="flex-center title">
          <slot name="levelData" :data="levelData">{{ levelData }}</slot>
        </div>
      </div>
      <OrgLaneItem :data="displayedData">
        <!-- <template #global> -->
        <template #global="{ data }">
          <slot name="global" :data="(data as OrgTree)"> </slot>
          <!-- <div @click="() => console.log(data)">{{ data.label || "data" }}</div> -->
        </template>
        <div>100</div>
        <!-- </template> -->
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
  </div>
</template>

<style lang="less" scoped>
#lane-chart-container {
  /* min-width: 1080px; */
  min-height: 600px;
  width: 100%;
  padding-bottom: 16px;
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
