<script lang="ts" setup>
import { computed } from "vue";
import {
  RevalidateContentInstance,
  RevalidateProps,
  RevalidateType,
} from "./config";
import { reactive } from "vue";
import { onMounted } from "vue";
import { onBeforeUnmount } from "vue";
// import SliderValidation from "./components/SliderValidation.vue";

let timer: number;

class FormState {
  constructor(
    public phoneNumber = "18512891630",
    public verifyCode = "",
    public inputText = "",
    public password = ""
  ) {}
}

const SMS_TIMER_KEY = "REVALIDATION_SMS_SEND_TIME";
// const phoneRegExp = /^1[3-9][0-9]{9}$/;

const { type, text, alertText } = defineProps<RevalidateProps>();
// const emits = defineEmits<{ (e: "ok"): void; (e: "cancel"): void }>();

const state = reactive({
  formModel: new FormState(),
  getVerifyCodeLoading: false,
  sendCodeInterval: 0,
});

const safeDisplayPhoneNumber = computed(() => {
  return (
    state.formModel.phoneNumber.substring(0, 3) +
    "****" +
    state.formModel.phoneNumber.substring(7)
  );
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
  await Promise.resolve();
  state.getVerifyCodeLoading = false;
  // 把这一次发送的时间存入到localStorage
  console.log(new Date().valueOf().toString());

  localStorage.setItem(SMS_TIMER_KEY, new Date().valueOf().toString());
  initVerifyCodeSendTime();
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

const validateVerifyCode = async () => {
  if (!state.formModel.verifyCode) {
    AMessage.error("请输入验证码");
    return false;
  }
  // 如果用户填写了校验码，则发起请求等校验结果
  const data = await Promise.resolve(true);
  return data;
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
  if (text !== state.formModel.inputText) {
    AMessage.error("您的输入有误，请重新输入");
    return false;
  }
  return true;
};

const validate = () => {
  return new Promise<boolean>(async (resolve, reject) => {
    let res: boolean;
    switch (type) {
      case RevalidateType.SMS:
        res = await validateVerifyCode();
        break;
      case RevalidateType.PASSWORD:
        res = await valdiatePassword();
        break;
      case RevalidateType.INPUT_TEXT:
        res = await valdiateInputText();
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
    <div v-else-if="type === RevalidateType.SLIDER"></div>
    <div v-else-if="type === RevalidateType.SMS">
      <a-input
        disabled
        v-model="safeDisplayPhoneNumber"
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
