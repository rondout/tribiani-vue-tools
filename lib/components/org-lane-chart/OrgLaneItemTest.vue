<script lang="ts" setup>
import { OrgTree } from "./data";
import arrowRight from "../../assets/arrow-right.svg";
import { defineOptions } from "vue";

defineOptions({ name: "OrgLaneItemTest" });
const props = defineProps<{ data: OrgTree[] }>();
</script>

<template>
  <div class="org-lane-container">
    <div v-for="data of props.data" :key="data.id" class="lane-item">
      <div class="item-content">
        <div class="title flex-center">{{ data.type }}</div>
        <div class="org-item-container flex-center">
          <div class="org-item-content">
            <div class="subtitle flex-between">
              <span>{{ data.id }}</span>
              <img :src="arrowRight" class="org-icon" alt="" />
            </div>
            <div class="sub-content flex-center">
              <div class="sub-content-title">{{ data.label }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- <OrgLaneItemTest :data="data.children"></OrgLaneItemTest> -->
    </div>
  </div>
</template>

<style lang="less" scoped>
.org-lane-container {
  //   display: flex;
  //   height: 100%;
  margin-right: 8px;
}

.lane-item {
  //   height: 100%;
  display: flex;
  width: 214px;
  background-color: #f8f9fb;
  //   border: 1px solid #e5e6eb;
  border-radius: 2px;
  .item-content {
    margin-right: 8px;
    position: relative;
    .title {
      width: 100%;
      position: absolute;
      top: 0;
      height: 36px;
      border-bottom: 1px solid #e5e6eb;
      box-sizing: border-box;
      font-weight: bold;
    }
    .org-item-container {
      height: calc(100% - 36px);
      padding-top: 16px;
      width: 216px;
      margin-right: 8px;
      .org-item-content {
        margin: 16px 0;
        background-color: #fff;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.08);
        width: 184px;
        height: 134px;
        .subtitle {
          background-color: #c6e3ff;
          height: 32px;
          font-size: 14px;
          color: #5b5b5b;
          padding: 0 12px;
          .org-icon {
            height: 18px;
            width: 18px;
            cursor: pointer;
          }
        }
        .sub-content {
          height: calc(100% - 32px);
          .sub-content-title {
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
