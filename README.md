#### tribiani-vue-tools

##### 数据结构 OrgTree 说明

OrgTree 的数据结构如下：

```ts
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
```

**注：** 这里是这个组件定义的 `OrgTree` 这个数据类型，如果后端返回的数据结构和该数据结构有差别或者说关键的字段名称对不上，则可以通过在使用组件的时候传入 `fieldNmaes` 属性来实现数据结构的匹配。该参数的数据结构如下：

```ts
export interface OrgFieldNames {
  id?: string;
  label?: string;
  children?: string;
  type?: string;
  isEmptyItem?: string;
}
```

我们可以对存在于改数据结构的属性名进行自定义，比如后台定义的子节点字段不是 children 而是 nodes，那么我们可以传入如下参数：

```html
<OrgLaneChart :fieldNames="{children:'nodes'}"></OrgLaneChart>
```

其他字段以此类推。

但是这样子我们在用 `data.nodes`这种方式去访问 `OrgTree` 的属性时不会有语法提示，因此我们需要重新声明这个 interface：

```ts
declare module "tribiani-vue-tools" {
  interface OrgTree {
    nodes: OrgTree[];
  }
}
```

**同样的，如果后台又返回其他对前端有用的字段，都可以用同样的方式去声明。**

##### props

| 属性                  | 数据类型   | 是否必须 | 说明                                                                    |
| --------------------- | ---------- | -------- | ----------------------------------------------------------------------- |
| treeData              | OrgTree[]  | true     | 传入的数据源                                                            |
| fieldNames            | FieldNames | false    | FieldNames， 字段名配置，类似于 arco 封装的 tree 组件的 fieldNames 属性 |
| defaultDisplayedLevel | number     | false    | 默认展示多少层级，如果默认展开全部则不传该值                            |

##### 插槽

这个组件有提供很多插槽，插槽说明如下：
|插槽名|参数传递|说明|
|-------|-------|-------|
|levelData|data |该插槽是泳道图头部的 title，并且该插槽会把这条泳道的关键信息通过 data 属性传递过来。|
|title|data|该插槽是每个树节点的 title 部分，我们可以通过这个插槽来自定义 title，同样的，该插槽通过 data 属性将这个**节点的数据（类型为 OrgTree）**传递回来，供我们使用。|
|content|data|用于自定义每一项的内容区域，每一项的内容通过 data 参数传递过来。|
|expand-icon|-|用于自定义展开图标。|
|collapse-icon|-|用于自定义收起图标。|
|默认插槽|data|自定义整个节点，节点的数据内容通过 data 参数传递过来。**注意：如果使用了默认不具名插槽，上面的插槽将无效。**|
