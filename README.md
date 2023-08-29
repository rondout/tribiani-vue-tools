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
  "files": [
    "dist"
  ],
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

### 使用 vite-plugin-dts 生成对应的声明文件

```ts
import dts from "vite-plugin-dts";
export default defineConfig({
  ///
  plugins: [vue(), dts()],
  ///
});
```

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
