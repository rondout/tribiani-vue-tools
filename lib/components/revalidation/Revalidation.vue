<script lang="ts" setup>
// import RevalidateModal from "./RevalidateModal.vue";
import { ref } from "vue";
import { RevalidateType, RevalidateTypeOptions } from "..";
import axios from "./axios";

// const revalidateContentRef = ref<RevalidateContentInstance>();
const type = ref(RevalidateType.SMS);
// const text = ref("hanshufei");
// const visible = ref(false);

const handleValidateOpen = () => {
  // visible.value = true;
  // openRevalidateModal({
  //   type: type.value,
  //   text: "hanshufei",
  //   title: null,
  //   onSuccess() {
  //     console.log("校验成功");
  //   },
  //   onError() {
  //     console.log("校验失败");
  //   },
  // });
  axios.post(
    "https://gatewaytest.wygsy.com/base-platform/api/v1/notify/batchSave",
    {
      allFlag: false,
      employeeInfoList: [
        {
          employeeId: "1648264233360948292",
          personName: "田明明二",
          mobile: "18515985422",
          id: 9037,
        },
      ],
      notifyTypeEnum: "EMPLOYEE_INFO",
    }
  );
};

const test = () => {
  axios.delete("/base-platform/api/v1/person/delete/1648264233360953401");
};

// const closeValidationModal = () => {
//   visible.value = false;
// };
</script>

<template>
  <h2>This is Revalidation Components</h2>
  <a-input></a-input>
  <a-radio-group v-model="type">
    <a-radio
      v-for="item of RevalidateTypeOptions"
      :key="item.value"
      :value="item.value"
      >{{ item.label }}</a-radio
    >
  </a-radio-group>
  <a-button @click="handleValidateOpen">打开验证</a-button>
  <a-button @click="test">打开图片验证</a-button>
  <!-- <RevalidateModal
    @cancel="closeValidationModal"
    :type="params.type"
    :visible="visible"
    :text="params.text"
  /> -->
</template>

<style lang="less" scoped></style>
