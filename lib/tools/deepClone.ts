export function deepClone<T>(target: T, ignoreFields?: string[]): T {
  // 先判断是否为空
  if (target === null) {
    return target;
  }
  // 判断是否为时间对象
  if (target instanceof Date) {
    return new Date(target.getTime()) as any;
  }
  // 再判断是不是数组，如果是需要递归遍历克隆
  if (target instanceof Array) {
    const cp = [] as 5[];
    (target as any[]).forEach((v) => {
      cp.push(v);
    });
    return cp.map((n: any) => deepClone<any>(n)) as any;
  }
  // 判断是不是object 如果是就需要一层层递归遍历
  if (typeof target === "object") {
    const cp = { ...(target as { [key: string]: any }) } as {
      [key: string]: any;
    };
    Object.keys(cp).forEach((k) => {
      // 判断遍历的key是否为需要忽略的key 不是就继续递归调用
      if (!ignoreFields || ignoreFields.indexOf(k) === -1) {
        cp[k] = deepClone<any>(cp[k]);
      }
    });
    return cp as T;
  }
  return target;
}
