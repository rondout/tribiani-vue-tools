export * from "./deepClone";
export { default as shallowClone } from "./shallowClone";

// 防抖函数
export function debounce<T extends Function>(cb: T, timeout = 300) {
  // 闭包一个上次触发时间
  let lastEmitTime: number;
  return function () {
    // 每次调用更新上次触发时间
    lastEmitTime = new Date().valueOf();
    setTimeout(() => {
      // 设置的timeout时间过后去比较最后一次调用时间是否已经是超过了设置的timeout  超过了就调用callback
      const currentTime = new Date().valueOf();
      if (currentTime - lastEmitTime >= timeout) {
        cb(...arguments);
      }
    }, timeout);
  };
}

// 节流函数
export function throttle<T extends Function>(cb: T, timeout = 1000) {
  let lastEmitTime = 0;
  const fn = function () {
    setTimeout(() => {
      const currentTime = new Date().valueOf();
      if (currentTime - lastEmitTime >= timeout) {
        lastEmitTime = new Date().valueOf();
        // @ts-ignore
        cb.call(this as T, ...arguments);
      }
    }, timeout);
  };
  return fn;
}
