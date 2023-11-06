import { h, ref } from "vue";
import RevalidateContentVue from "./RevalidateContent.vue";

/**
 * @description 验证的方式 短信、密码、滑块、输入文字
 */
export enum RevalidateType {
  SMS = "SHORT_MSG",
  PASSWORD = "PASSWORD",
  IMAGE_CODE = "VALIDATE_CODE",
  INPUT_TEXT = "INPUT_TEXT",
}

export interface RevalidateProps {
  response: RevalidateTriggeredResponseData;
  type: RevalidateType;
  alertText?: string;
  visible?: boolean;
  width?: number;
  title?: string;
  text?: string;
}

export const RevalidateTypeLabelMap = new Map([
  [RevalidateType.INPUT_TEXT, "文字输入验证"],
  [RevalidateType.PASSWORD, "密码验证"],
  [RevalidateType.IMAGE_CODE, "图片验证"],
  [RevalidateType.SMS, "短信验证"],
]);

const options: { label: string; value: RevalidateType }[] = [];
RevalidateTypeLabelMap.forEach((label, value) => {
  options.push({ label, value });
});
export const RevalidateTypeOptions = options;

export interface RevalidateContentInstance {
  validate(): Promise<boolean>;
  handleCancel(): void;
}

export interface RevalidateParams extends RevalidateProps {
  onSuccess?(): void;
  onError?(): void;
}

export const openRevalidateModal = (args: RevalidateParams) => {
  const revalidateContentRef = ref<RevalidateContentInstance>();

  AModal.open({
    titleAlign: "start",
    width: 432,
    modalStyle: { maxWidth: "90%" },
    title: args.title || RevalidateTypeLabelMap.get(args.type) || "二次验证",
    content: () =>
      h(RevalidateContentVue, {
        text: args.text,
        type: args.type,
        alertText: args.alertText || "检测到你的操作有风险，我们需要二次验证",
        ref: revalidateContentRef,
        response: args.response,
      }),
    onBeforeOk(done) {
      revalidateContentRef.value
        .validate()
        .then((result) => {
          done(result);
          args.onSuccess && args.onSuccess();
        })
        .catch(() => {
          done(false);
          args.onError && args.onError();
        });
    },
  });
};

export enum OpenSafeServiceEnum {
  短信发送操作 = "ROSTER_NOTIFY_MSG_LIMIT_OPEN_SAFE",
  删除人员操作 = "ROSTER_DELETE_PERSON_LIMIT_OPEN_SAFE",
}

export interface BaseValidateParams {
  openSafeService: OpenSafeServiceEnum;
  openSafeType: RevalidateType;
  md5Str: string;
  mobile: string;
}

export interface MsgCodeValidateParams extends BaseValidateParams {
  shortCode: string;
}

export interface ImageCodeValidateParams extends BaseValidateParams {
  validateCode: string;
}

export interface StartValidateParams extends BaseValidateParams {
  openSafeDesc: string;
  openSafeTime: number;
  openSafeReenterTxt: string;
}

export interface RevalidateTriggeredResponseData extends StartValidateParams {
  mobile: string;
}

export interface StartValidateResponseData {
  shortMsg?: string;
  effectiveTime?: number;
  image?: string;
  validateCode?: string;
  originalHeight?: number;
  originalWidth?: number;
}
export interface StartValidateResponse {
  data: StartValidateResponseData;
}

export interface RevalidateBaseResponse {
  data: RevalidateTriggeredResponseData;
  code: number;
}
