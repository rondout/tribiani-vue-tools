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
import { watch } from "vue";

const props = defineProps<{
  treeData: OrgTree<T>[];
  id?: string;
  fieldNames?: OrgFieldNames;
  defaultDisplayedLevel?: number;
}>();

const fieldNames = computed(() => {
  return {
    id: props.fieldNames?.id || "id",
    children: props.fieldNames?.children || "children",
    label: props.fieldNames?.label || "label",
    type: props.fieldNames?.type || "type",
    isEmptyItem: props.fieldNames.isEmptyItem || "isEmptyItem",
  };
});

// const state = reactive({
//   elId: "lane-chart-container",
// });

// const data = ref(deepClone(orgDatas));
const unCollapsedIds = ref<(string | number)[]>([]);

const parseDefaultUnclollapsedIds = () => {
  const defaultCollapsedIds: (string | number)[] = [];
  const defaultDisplayedLevel =
    props.defaultDisplayedLevel === undefined
      ? Infinity
      : props.defaultDisplayedLevel - 1 || 0;
  const newTreeData = deepClone(props.treeData);

  const checkDefaultDisplay = (treeDatas: OrgTree<T>[], level = 0) => {
    treeDatas.forEach((item) => {
      // 如果层级已经超出了就不再继续找应该展示得了（如果子集是empty则需要展示）
      if (!item.isEmpty && level >= defaultDisplayedLevel) {
        return;
      }
      defaultCollapsedIds.push(item[fieldNames.value.id]);
      if (item.children?.length && level < defaultDisplayedLevel) {
        checkDefaultDisplay(item.children || [], level + 1);
      }
    });
    // }
  };
  checkDefaultDisplay(newTreeData);
  unCollapsedIds.value.push(...defaultCollapsedIds);
};

watch(
  () => props.treeData,
  () => {
    parseDefaultUnclollapsedIds();
  },
  { immediate: true }
);

const displayedData = computed<OrgTree<T>[]>(() => {
  const newTreeData = deepClone(props.treeData);

  const checkCollapsed = (treeDatas: OrgTree<T>[]) => {
    treeDatas.forEach((item) => {
      item.hasChild = item[fieldNames.value.children]?.length > 0;
      if (!unCollapsedIds.value?.includes(item.id) && !item.isEmpty) {
        // 如果没有在已经展开的id列表里面
        item.collapsed = true;
        delete item[fieldNames.value.children];
      }
      if (item[fieldNames.value.children]?.length) {
        checkCollapsed(item[fieldNames.value.children]);
      }
    });
  };
  checkCollapsed(newTreeData);
  return newTreeData;
});

const handleExpandClick = (
  data: OrgTree<string | number>,
  isCollapse: boolean
) => {
  if (isCollapse) {
    unCollapsedIds.value = unCollapsedIds.value.filter((v) => v !== data.id);
  } else {
    unCollapsedIds.value.push(data.id);
    // data.children?.forEach((child) => {
    //   if (child.isEmpty) {
    //     unCollapsedIds.value.push(child.id);
    //   }
    // });
  }
};

provide(ExpanClickInjectionKey, handleExpandClick);
provide(FieldNamesInjectionKey, fieldNames.value);

const labelAndLevel = computed(() => {
  return parseTreeLevel(props.treeData, props.fieldNames?.type || "type");
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
