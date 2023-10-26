import { h, ref } from "vue";
import RevalidateContentVue from "./RevalidateContent.vue";

export interface RevalidateProps {
  type: RevalidateType;
  alertText?: string;
  visible?: boolean;
  width?: number;
  title?: string;
  text?: string;
}

/**
 * @description 验证的方式 短信、密码、滑块、输入文字
 */
export enum RevalidateType {
  SMS,
  PASSWORD,
  SLIDER,
  INPUT_TEXT,
}

export const RevalidateTypeLabelMap = new Map([
  [RevalidateType.INPUT_TEXT, "文字输入验证"],
  [RevalidateType.PASSWORD, "密码验证"],
  [RevalidateType.SLIDER, "滑块验证"],
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
        alertText: "由于你半小时内连续下发短信3次，超过三次，我们需要二次验证",
        ref: revalidateContentRef,
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
