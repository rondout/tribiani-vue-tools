import { RevalidateTriggeredResponseData, openRevalidateModal } from "..";

export function useRevalidation(params: RevalidateTriggeredResponseData) {
  const handleValidateOpen = () => {
    // visible.value = true;
    openRevalidateModal({
      type: params.openSafeType,
      //   text: "hanshufei",
      title: null,
      alertText: params.openSafeDesc,
      response: params,
      onSuccess() {
        console.log("校验成功");
      },
      onError() {
        console.log("校验失败");
      },
    });
  };

  handleValidateOpen();

  return { handleValidateOpen };
}
