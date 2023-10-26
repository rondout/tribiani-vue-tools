import { InjectionKey } from "vue";

export interface OrgTree<T = string | number> {
  label?: string;
  id?: T;
  type?: string;
  collapsed?: boolean;
  hasChild?: boolean;
  isEmpty?: boolean;
  pid?: string;
  children?: OrgTree<T>[];
  [propName: string]: any;
}

export function parseTreeLevel<T>(data: OrgTree<T>[], typeKey: string) {
  let labels: string[] = [];
  let level = 0;

  function calcLabel(data: OrgTree<T>[] = []) {
    data.forEach((item) => {
      if (!labels.includes(item[typeKey])) {
        labels.push(item[typeKey]);
      }
      if (item.children?.length) {
        calcLabel(item.children);
      }
    });
  }
  calcLabel(data);
  level = labels.length;
  console.log(labels, level);

  return { labels, level };
}

export const ExpanClickInjectionKey = Symbol() as InjectionKey<
  (data: OrgTree<string | number>, isCollapse: boolean) => void
>;

export interface OrgFieldNames {
  id?: string;
  label?: string;
  children?: string;
  type?: string;
  isEmptyItem?: string;
}

export const FieldNamesInjectionKey = Symbol() as InjectionKey<OrgFieldNames>;
