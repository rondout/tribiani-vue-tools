# 自己封装 vue3+ts 组件库并且发布到 NPM

## 创建项目

```shell
pnpm create vite
```

## 配置 package.json

按照提示创建好项目，然后再 `package.json` 中进行如下配置：

```json
{
  "name": "tribiani-vue-tools",
  "private": false,
  "version": "0.0.12",
  "type": "module",
  "types": "dist/lib/main.d.ts",
  "module": "dist/main.es.js",
  "files": ["dist"],
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.3.4"
  },
  "devDependencies": {
    "@types/node": "^20.5.3",
    "@vitejs/plugin-vue": "^4.2.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5",
    "vite-plugin-dts": "^3.5.2",
    "vue-tsc": "^1.8.5"
  }
}
```

配置解读：

| 属性    | 配置           | 值      |
| ------- | -------------- | ------- |
| name    | 包名称         | string  |
| private | 是否私有       | boolean |
| types   | 声明文件路径   | path    |
| module  | 模块           | path    |
| files   | 包含的文件路径 | dirs    |

## 配置 vite.config.ts

### 配置库模式

这里需要配置[库模式](https://cn.vitejs.dev/guide/build.html#library-mode)

```ts
 build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'MyLib',
      // the proper extensions will be added
      // fileName: 'my-lib',
      fileName(format, entryName) {
        return `${entryName}.${format}.js`
      },
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
```

**注：建议将 external 里面包含的依赖，在安装的时候就安装到 packages.json 里面的 peerDependencies。**

### 使用 vite-plugin-dts 生成对应的声明文件

```ts
import dts from "vite-plugin-dts";
export default defineConfig({
  ///
  plugins: [vue(), dts()],
  ///
});
```

### 编写组件

我们简单的封装一个自己的组件和对应的一些方法，我的做法是直接在项目的根目录下面创建 `lib` 目录，然后创建以下文件和目录：

```
|-lib
|----components
|----|----HButton.vue
|----|----HClone.vue
|----|----index.ts
|----|----main.css
|----tools
|----|----deepClone.ts
|----|----index.ts
|----|----shallowClone.ts
|----main.ts
```

我们可以在 HButton 组件里面简单的写一下组件：

```html
<script lang="ts" setup>
  import { CSSProperties, computed } from "vue";

  const props = defineProps<{ backgroundColor?: string; color?: string }>();

  const styleObj = computed<CSSProperties>(() => {
    return {
      backgroundColor: props.backgroundColor || "#3f51b5",
      color: props.color,
    };
  });
</script>

<template>
  <button class="h-button" :style="styleObj">
    <slot>this is default button</slot>
  </button>
</template>

<style lang="css" scoped></style>
```

以及编写 css 文件

```css
.h-button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
```

然后在 index.ts 里面暴露出去

```ts
import "./main.css";
export { default as HButton } from "./HButton.vue";
export { default as HClone } from "./HCloneTest.vue";
```

### 打包和发布

使用命令直接打包，然后打包的文件会存放在 dist 目录，由于我们已经在 package.json 里面配置了 files 属性只想了 dist 目录，因此我么只需要使用 `npm login` 登陆到 npm 然后使用 `npm publish` 命令直接发布包到 npm 即可。

## 问题记录

### 怎么从一个 TS 文件到处其他的 TS 文件

```ts
export * from "./tools";
export * from "./components";
export * from "./deepClone";
export { default as shallowClone } from "./shallowClone";
```

### 怎么从一个 TS 文件导出多个 vue 组件

```ts
export { default as HButton } from "./HButton.vue";
export { default as HClone } from "./HCloneTest.vue";
```

### 将公共样式写在 vue 组件里面导致其他项目引入该组件的时候样式不生效

因为我们如果直接在 vue 组件的 style 标签里面写的样式，这些 css 代码是会被 vue 打包的，最终会变成类名假属性的选择器，因此不生效，解决方案就是用单独的 css 文件去写，然后其他项目在用的时候直接引入这个 css 文件即可。
