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

// export const orgDatas: OrgTree[] = [
//   {
//     label: "万科大帝住宅项目",
//     id: "0000001",
//     type: "项目",
//     children: [
//       {
//         label: "项目一号楼",
//         id: "0000001-1",
//         pid: "0000001",
//         type: "单项工程",
//         children: [
//           {
//             label: "地基采挖",
//             id: "0000001-1-1",
//             pid: "0000001-1",
//             type: "单位工程",
//             children: [
//               {
//                 label: "换填垫层",
//                 id: "0000001-1-1-1",
//                 pid: "0000001-1-1",
//                 type: "分项",
//                 children: [
//                   {
//                     label: "刮腻子",
//                     id: "0000001-1-1-1-1",
//                     type: "工序",
//                     children: [],
//                   },
//                   {
//                     label: "刮腻子",
//                     id: "0000001-1-1-1-2",
//                     type: "工序",
//                     children: [],
//                   },
//                 ],
//               },
//               {
//                 label: "换填垫层",
//                 id: "0000001-1-1-2",
//                 pid: "0000001-1-1",
//                 type: "分项",
//                 children: [],
//               },
//               {
//                 label: "换填垫层",
//                 id: "0000001-1-1-3",
//                 pid: "0000001-1-1",
//                 type: "分项",
//                 children: [],
//               },
//               {
//                 label: "换填垫层",
//                 id: "0000001-1-1-4",
//                 pid: "0000001-1-1",
//                 type: "分项",
//                 children: [
//                   {
//                     label: "刮腻子",
//                     id: "0000001-1-1-4-2",
//                     type: "工序",
//                     children: [],
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             label: "地基夯实",
//             id: "0000001-1-2",
//             pid: "0000001-1",
//             type: "单位工程",
//             children: [],
//           },
//         ],
//       },
//       {
//         label: "项目二号楼",
//         id: "0000001-2",
//         pid: "0000001",
//         type: "单项工程",
//         children: [
//           //   {
//           //     label: "项目二child1",
//           //     id: "0000001-2-1",
//           //     pid: "0000001-2",
//           //     type: "单项工程11",
//           //     children: [],
//           //   },
//         ],
//       },
//       {
//         label: "项目三号楼",
//         id: "0000001-3",
//         pid: "0000001",
//         type: "单项工程",
//         children: [
//           {
//             label: "项目三child1",
//             id: "0000001-3-1",
//             pid: "0000001-3",
//             type: "单项工程",
//             children: [],
//           },
//           {
//             label: "项目三child2",
//             id: "0000001-3-2",
//             pid: "0000001-3",
//             type: "单项工程",
//             children: [],
//           },
//           {
//             label: "项目三child3",
//             id: "0000001-3-3",
//             pid: "0000001-3",
//             type: "单项工程",
//             children: [],
//           },
//         ],
//       },
//     ],
//   },
// ];

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
  (id: string | number, isCollapse: boolean) => void
>;

export interface OrgFieldNames {
  id?: string;
  label?: string;
  children?: string;
  type?: string;
  isEmptyItem?: string;
}

export const FieldNamesInjectionKey = Symbol() as InjectionKey<OrgFieldNames>;
