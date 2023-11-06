<script lang="ts" setup>
import { computed } from "vue";
import { RevalidateProps, RevalidateType } from "./config";
// import IMAGE_CODEValidation from "./components/IMAGE_CODEValidation.vue";
import { ModalConfig } from "@arco-design/web-vue";

const { title, visible, type, text } = defineProps<RevalidateProps>();
const emits = defineEmits<{ (e: "ok"): void; (e: "cancel"): void }>();

const handleCancel = () => {
  emits("cancel");
};

const handleBeforeOk: ModalConfig["onBeforeOk"] = (done) => {
  done(true);
  handleCancel();
};

const getValidateCodeText = computed(() => {
  return "获取验证码";
});
</script>

<template>
  <a-modal
    :title="title || '安全验证'"
    :visible="visible"
    :width="432"
    title-align="start"
    :modalStyle="{ maxWidth: '90%' }"
    @cancel="handleCancel"
    @before-ok="handleBeforeOk"
  >
    <a-alert
      >由于你半小时内连续下发短信 3次，超过三次，我们需要二次验证</a-alert
    >
    <div style="padding: 24px 0">
      <div v-if="type === RevalidateType.PASSWORD">
        <input
          type="password"
          style="display: none"
          placeholder="请输入当前账号密码"
        />
        <a-input-password placeholder="请输入当前账号密码"></a-input-password>
      </div>
      <div v-else-if="type === RevalidateType.INPUT_TEXT">
        <div style="margin-bottom: 16px">
          {{ `请在下方输入框中输入"${text}"以确认该操作` }}
        </div>
        <a-input placeholder="请输入文字"></a-input>
      </div>
      <div v-else-if="type === RevalidateType.IMAGE_CODE"></div>
      <div v-else-if="type === RevalidateType.SMS">
        <a-input placeholder="请输入11位的手机号" allow-clear>
          <template #prepend>
            <span style="color: #86909c"> +86 </span>
          </template>
        </a-input>
        <div
          style="display: flex; justify-content: flex-start; margin-top: 16px"
        >
          <a-input
            placeholder="请输入验证码"
            style="flex: 1; margin-right: 12px"
          >
          </a-input>
          <a-button loading type="primary">{{ getValidateCodeText }}</a-button>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<style lang="less" scoped></style>
