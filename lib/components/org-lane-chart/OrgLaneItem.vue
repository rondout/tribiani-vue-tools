<script lang="ts" setup>
import { OrgTree } from "./data";
import OrgDetailItem from "./OrgDetailItem.vue";

defineOptions({ name: "OrgLaneItem" });
const props = withDefaults(
  defineProps<{ data: OrgTree[]; index?: number; hasParent?: boolean }>(),
  {
    index: 0,
  }
);
</script>

<template>
  <div class="org-lane-container">
    <div v-for="(item, index) of props.data" :key="item.id" class="lane-item">
      <div style="margin-right: 16px">
        <OrgDetailItem
          :index="index"
          :total="props.data?.length"
          :has-parent="props.hasParent"
          :data="item"
        >
          <template #title="{ data }">
            <slot name="title" :data="data"> </slot>
          </template>
          <template #content="{ data }">
            <slot name="content" :data="data"> </slot>
          </template>
          <template #expand-icon>
            <slot name="expand-icon" :data="data"> </slot>
          </template>
          <template #collapse-icon>
            <slot name="collapse-icon" :data="data"> </slot>
          </template>
        </OrgDetailItem>
      </div>
      <!-- 这里迭代出来的一定有父级 -->
      <OrgLaneItem has-parent :data="item.children" :index="index">
        <!-- @vue-ignore -->
        <template #title="{ data }">
          <slot name="title" :data="(data as OrgTree)"> </slot>
        </template>
        <!-- @vue-ignore -->
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
.org-lane-container {
  display: flex;
  // height: 100%;
  flex-direction: column;
  margin-right: 8px;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.lane-item {
  height: 100%;
  display: flex;
  width: 216px;
  // background-color: #f8f9fb;
  //   border: 1px solid #e5e6eb;
  border-radius: 2px;
  .title {
    height: 36px;
    border-bottom: 1px solid #e5e6eb;
    box-sizing: border-box;
    font-weight: bold;
  }
}
</style>
