<script lang="ts" setup>
import { computed } from "vue";
import arrowRight from "../../assets/arrow-right.svg";
import arrowLeft from "../../assets/arrow-left.svg";
import { ExpanClickInjectionKey, OrgTree } from "./data";
import { inject } from "vue";

const handleClick = inject(ExpanClickInjectionKey);

const props = defineProps<{
  data: OrgTree;
  hasParent?: boolean;
  index?: number;
  total?: number;
}>();

const hasChild = computed(() => {
  return props.data?.children?.length > 0;
});

/**
 * @returns {boolean} 计算是不是存在父级  并且是不是父级的最后一个子集，因为最后一个子集要划线向上
 */
const hasParentAndIsLastChild = computed(() => {
  return props.hasParent && props.index + 1 === props.total;
});

/**
 * @returns {boolean} 计算是不是存在父级  并且是不是父级的第一个子集，因为第一个子集要划线向下
 */
const hasParentAndIsFirstChild = computed(() => {
  return props.hasParent && props.index === 0;
});
/**
 * @returns {boolean} 计算是不是存在父级  并且是不是父级的第一个子集或者最后一个元素，如果都不是，则应该画一条线，上线都延伸
 */
const hasParentAndNotFirstOrLastChild = computed(() => {
  return props.hasParent && props.index + 1 < props.total && props.index > 0;
});
/**
 * @returns {boolean} 计算是不是存在父级  并且是不是唯一一个child  是的只画横线
 */
const hasParentAndIsOnlyChild = computed(() => {
  return props.hasParent && props.total === 1;
});

const title = computed(() => {
  if (props.data?.collapsed) {
    return "collapsed";
  }
  if (hasParentAndIsOnlyChild.value) {
    return "唯一一个儿子";
  }
  if (hasParentAndIsFirstChild.value) {
    return "第一个儿子";
  }
  if (hasParentAndIsLastChild.value) {
    return "最后一个儿子";
  }
  if (hasParentAndNotFirstOrLastChild.value) {
    return "中间的儿子";
  }
  return "其他";
});
</script>

<template>
  <div
    :class="{
      'org-item-container': true,
      'org-item-container-with-parent': props.hasParent,
      'last-child': hasParentAndIsLastChild,
      'first-child': hasParentAndIsFirstChild,
      'only-child': hasParentAndIsOnlyChild,
      'not-first-last-child': hasParentAndNotFirstOrLastChild,
      'flex-center': true,
    }"
  >
    <div
      :class="{
        'org-item-content': true,
        'org-item-content-has-child': hasChild,
        'org-item-content-has-parent': hasParent,
      }"
    >
      <div class="subtitle flex-between">
        <slot name="title" :data="props.data">
          <span>{{ title }}</span>
        </slot>
        <template v-if="props.data?.hasChild">
          <template v-if="!props.data?.collapsed">
            <div class="org-icon" @click="handleClick(props.data.id, true)">
              <slot name="collapse-icon">
                <img :src="arrowLeft" alt="" />
              </slot>
            </div>
          </template>
          <template v-else>
            <div class="org-icon" @click="handleClick(props.data.id, false)">
              <slot name="expand-icon">
                <img :src="arrowRight" alt="" />
              </slot>
            </div>
          </template>
        </template>
      </div>
      <slot name="content" :data="props.data">
        <div class="sub-content flex-center flex-column">
          <div class="sub-content-title">{{ props.data.label }}</div>
        </div>
      </slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.org-item-container {
  cursor: pointer;
  //   height: calc(100% - 36px);
  height: 100%;
  //   padding-top: 16px;
  width: 216px;
  position: relative;
  .org-item-content {
    display: flex;
    flex-direction: column;
    margin: 12px 0;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.08);
    width: 184px;
    min-height: 60px;
    .subtitle {
      // background-color: #c6e3ff;
      height: 32px;
      font-size: 14px;
      color: #5b5b5b;
      position: relative;
      .org-icon {
        height: 18px;
        width: 18px;
        cursor: pointer;
        position: absolute;
        right: 6px;
      }
    }
    .sub-content {
      flex: 1;
      //   height: calc(100% - 32px);
      .sub-content-title {
        font-weight: bold;
      }
    }
  }
  .org-item-content-has-child {
    // background-color: #3f51b5;
    position: relative;
  }

  .org-item-content-has-child::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -25px;
    width: 25px;
    height: 2px;
    background-color: #fa9e18;
  }

  .org-item-content-has-parent {
    // background-color: skyblue;
    position: relative;
  }

  .org-item-content-has-parent::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -25px;
    width: 25px;
    height: 2px;
    background-color: #fa9e18;
  }
}

.org-item-content {
  background-color: #fff;
}
.org-item-container-with-parent::before {
  content: "";
  position: absolute;
  //   top: 50%;
  height: 50%;
  width: 2px;
  background-color: #fa9e18;
  left: -9px;
}
.last-child::before {
  top: 0;
}
.first-child::before {
  top: 50%;
  height: 50%;
}
.only-child::before {
  height: 0;
}
.not-first-last-child::before {
  height: 100%;
}
</style>
