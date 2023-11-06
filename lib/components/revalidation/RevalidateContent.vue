<script lang="ts" setup>
import { computed } from "vue";
import {
  RevalidateContentInstance,
  RevalidateProps,
  RevalidateType,
  MsgCodeValidateParams,
  StartValidateResponseData,
} from "./config";
import { reactive } from "vue";
import { onMounted } from "vue";
import { onBeforeUnmount } from "vue";
import { startValidate, handleRevalidate } from "./axios";
import { watch } from "vue";
import { mergeProps } from "vue";
import { ImageCodeValidateParams } from "..";
// import IMAGE_CODEValidation from "./components/IMAGE_CODEValidation.vue";

let timer: number;

class FormState {
  constructor(
    public phoneNumber = "",
    public verifyCode = "",
    public imageCode = "",
    public inputText = "",
    public password = ""
  ) {}
}

const SMS_TIMER_KEY = "REVALIDATION_SMS_SEND_TIME";
// const phoneRegExp = /^1[3-9][0-9]{9}$/;

const props = defineProps<RevalidateProps>();
// const emits = defineEmits<{ (e: "ok"): void; (e: "cancel"): void }>();

const state = reactive({
  formModel: new FormState(),
  getVerifyCodeLoading: false,
  getImageCodeLoading: false,
  sendCodeInterval: 0,
  imgData: null as StartValidateResponseData,
});

//
const initVerifyCodeSendTime = () => {
  const lastSendTime =
    new Date(parseInt(localStorage.getItem(SMS_TIMER_KEY))).valueOf() || 0;
  const nowTime = new Date().valueOf();
  const timeInterval = parseInt(((nowTime - lastSendTime) / 1000).toString());
  // 如果超过了60秒
  if (timeInterval >= 60) {
    state.sendCodeInterval = 0;
  } else {
    // 否则
    state.sendCodeInterval = 60 - timeInterval;
  }
};

onMounted(() => {
  initVerifyCodeSendTime();
  timer = setInterval(() => {
    if (state.sendCodeInterval > 0) {
      state.sendCodeInterval--;
    }
  }, 1000);
});

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
  }
});

// 获取短信验证码
const handleGetVerifyCode = async () => {
  // const phoneNumberValid = await validateVerifyCode();
  // if (!phoneNumberValid) {
  //   return;
  // }
  state.getVerifyCodeLoading = true;
  // 模拟获取验证码
  await startValidate(props.response);
  // state.formModel.phoneNumber = data.data.mobile || "";
  // state.formModel.verifyCode = responseData.data.shortMsg;
  state.getVerifyCodeLoading = false;
  // 把这一次发送的时间存入到localStorage
  console.log(new Date().valueOf().toString());

  localStorage.setItem(SMS_TIMER_KEY, new Date().valueOf().toString());
  initVerifyCodeSendTime();
};

// 获取图片验证码
const handleGetImageCode = async () => {
  try {
    state.getImageCodeLoading = true;
    const data = await startValidate(props.response);
    state.imgData = data.data.data;
    console.log(1111, state.imgData);

    state.getImageCodeLoading = false;
  } catch (error) {
    state.getImageCodeLoading = false;
  }
};

const getVerifyCodeText = computed(() => {
  if (state.sendCodeInterval) {
    return state.sendCodeInterval + "秒后重新发送";
  }
  return "获取验证码";
});

const getVerifyCodeDisabled = computed(() => {
  return state.sendCodeInterval > 0;
});

const valdiateImageCode = async () => {
  if (!state.formModel.imageCode) {
    AMessage.error("请输入图片计算结果");
    return false;
  }
  // 如果用户填写了校验码，则发起请求等校验结果
  const params: ImageCodeValidateParams = {
    validateCode: state.formModel.imageCode,
    ...props.response,
  };
  try {
    const data = await handleRevalidate(params);
    if (data.data.success === true) {
      return true;
    } else if (data.data.msg) {
      AMessage.error(data.data.msg);
    }
    return false;
  } catch (error) {
    return false;
  }
};

const validateVerifyCode = async () => {
  if (!state.formModel.verifyCode) {
    AMessage.error("请输入验证码");
    return false;
  }
  // 如果用户填写了校验码，则发起请求等校验结果
  const params: MsgCodeValidateParams = {
    shortCode: state.formModel.verifyCode,
    ...props.response,
  };
  try {
    const data = await handleRevalidate(params);
    if (data.data.success === true) {
      return true;
    } else if (data.data.msg) {
      AMessage.error(data.data.msg);
      return false;
    }
  } catch (error) {
    return false;
  }
};

const valdiatePassword = async () => {
  if (!state.formModel.password) {
    AMessage.error("请输入密码");
    return false;
  }
  return false;
};

const valdiateInputText = async () => {
  // return true;
  if (props.text !== state.formModel.inputText) {
    AMessage.error("您的输入有误，请重新输入");
    return false;
  }
  return true;
};

const validate = () => {
  return new Promise<boolean>(async (resolve, reject) => {
    let res: boolean;
    switch (props.type) {
      case RevalidateType.SMS:
        res = await validateVerifyCode();
        break;
      case RevalidateType.PASSWORD:
        res = await valdiatePassword();
        break;
      case RevalidateType.INPUT_TEXT:
        res = await valdiateInputText();
        break;
      case RevalidateType.IMAGE_CODE:
        res = await valdiateImageCode();
        break;
      default:
        break;
    }
    if (res) {
      AMessage.success("验证成功");
      resolve(res);
    } else {
      reject(false);
    }
  });
};

watch(
  () => mergeProps,
  () => {
    console.log({ props });
    state.formModel.phoneNumber = props.response.mobile;
    if (props.type === RevalidateType.IMAGE_CODE) {
      handleGetImageCode();
    }
  },
  {
    immediate: true,
  }
);

const handleCancel = () => {
  state.formModel = new FormState();
};

defineExpose<RevalidateContentInstance>({
  validate,
  handleCancel,
});
</script>

<template>
  <a-alert>{{ alertText || "为了保证安全，系统需要验证您的操作" }}</a-alert>
  <div style="padding: 24px 0">
    <div v-if="type === RevalidateType.PASSWORD">
      <input
        type="password"
        style="width: 0; height: 0; opacity: 0"
        placeholder="请输入当前账号密码"
      />
      <a-input-password
        v-model="state.formModel.password"
        placeholder="请输入当前账号密码"
      ></a-input-password>
    </div>
    <div v-else-if="type === RevalidateType.INPUT_TEXT">
      <div style="margin-bottom: 16px">
        {{ `请在下方输入框中输入"${text}"以确认该操作` }}
      </div>
      <a-input
        v-model="state.formModel.inputText"
        placeholder="请输入文字"
      ></a-input>
    </div>
    <div v-else-if="type === RevalidateType.IMAGE_CODE">
      <div
        style="display: flex; flex-wrap: nowrap; justify-content: space-between"
      >
        <a-input
          style="margin-right: 64px"
          placeholder="请输入图片计算结果"
          v-model="state.formModel.imageCode"
        ></a-input>
        <img :src="state.imgData?.image" :width="150" :height="34" />
      </div>
    </div>
    <div v-else-if="type === RevalidateType.SMS">
      <a-input
        disabled
        v-model="state.formModel.phoneNumber"
        placeholder="请输入11位的手机号"
        :max-length="11"
        allow-clear
      >
        <template #prepend>
          <span style="color: #86909c"> +86 </span>
        </template>
      </a-input>
      <div style="display: flex; justify-content: flex-start; margin-top: 16px">
        <a-input
          v-model="state.formModel.verifyCode"
          placeholder="请输入验证码"
          style="flex: 1; margin-right: 12px"
        >
        </a-input>
        <a-button
          :disabled="getVerifyCodeDisabled"
          :loading="state.getVerifyCodeLoading"
          type="primary"
          @click="handleGetVerifyCode"
          >{{ getVerifyCodeText }}</a-button
        >
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
