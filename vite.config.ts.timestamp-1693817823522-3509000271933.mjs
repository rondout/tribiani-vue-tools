// vite.config.ts
import { defineConfig } from "file:///C:/Users/joey/Desktop/prac/NPM-REGISTRY/tribiani-vue-tools/node_modules/.pnpm/registry.npmmirror.com+vite@4.4.5_@types+node@20.5.3/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/joey/Desktop/prac/NPM-REGISTRY/tribiani-vue-tools/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-vue@4.2.3_vite@4.4.5_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import dts from "file:///C:/Users/joey/Desktop/prac/NPM-REGISTRY/tribiani-vue-tools/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-dts@3.5.2_@types+node@20.5.3_typescript@5.0.2_vite@4.4.5/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\joey\\Desktop\\prac\\NPM-REGISTRY\\tribiani-vue-tools";
var vite_config_default = defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__vite_injected_original_dirname, "lib/main.ts"),
      name: "Hsf-Lib",
      // the proper extensions will be added
      // fileName: "my-lib",
      fileName(format, entryName) {
        return `${entryName}.${format}.js`;
      }
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxqb2V5XFxcXERlc2t0b3BcXFxccHJhY1xcXFxOUE0tUkVHSVNUUllcXFxcdHJpYmlhbmktdnVlLXRvb2xzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxqb2V5XFxcXERlc2t0b3BcXFxccHJhY1xcXFxOUE0tUkVHSVNUUllcXFxcdHJpYmlhbmktdnVlLXRvb2xzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9qb2V5L0Rlc2t0b3AvcHJhYy9OUE0tUkVHSVNUUlkvdHJpYmlhbmktdnVlLXRvb2xzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCBkdHMgZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3Z1ZSgpLCBkdHMoKV0sXG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICAvLyBDb3VsZCBhbHNvIGJlIGEgZGljdGlvbmFyeSBvciBhcnJheSBvZiBtdWx0aXBsZSBlbnRyeSBwb2ludHNcbiAgICAgIGVudHJ5OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcImxpYi9tYWluLnRzXCIpLFxuICAgICAgbmFtZTogXCJIc2YtTGliXCIsXG4gICAgICAvLyB0aGUgcHJvcGVyIGV4dGVuc2lvbnMgd2lsbCBiZSBhZGRlZFxuICAgICAgLy8gZmlsZU5hbWU6IFwibXktbGliXCIsXG4gICAgICBmaWxlTmFtZShmb3JtYXQsIGVudHJ5TmFtZSkge1xuICAgICAgICByZXR1cm4gYCR7ZW50cnlOYW1lfS4ke2Zvcm1hdH0uanNgO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIC8vIFx1Nzg2RVx1NEZERFx1NTkxNlx1OTBFOFx1NTMxNlx1NTkwNFx1NzQwNlx1OTBBM1x1NEU5Qlx1NEY2MFx1NEUwRFx1NjBGM1x1NjI1M1x1NTMwNVx1OEZEQlx1NUU5M1x1NzY4NFx1NEY5RFx1OEQ1NlxuICAgICAgZXh0ZXJuYWw6IFtcInZ1ZVwiXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICAvLyBcdTU3MjggVU1EIFx1Njc4NFx1NUVGQVx1NkEyMVx1NUYwRlx1NEUwQlx1NEUzQVx1OEZEOVx1NEU5Qlx1NTkxNlx1OTBFOFx1NTMxNlx1NzY4NFx1NEY5RFx1OEQ1Nlx1NjNEMFx1NEY5Qlx1NEUwMFx1NEUyQVx1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlxuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgdnVlOiBcIlZ1ZVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThXLFNBQVMsb0JBQW9CO0FBQzNZLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFDakIsT0FBTyxTQUFTO0FBSGhCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQUEsRUFDdEIsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBO0FBQUEsTUFFSCxPQUFPLEtBQUssUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDNUMsTUFBTTtBQUFBO0FBQUE7QUFBQSxNQUdOLFNBQVMsUUFBUSxXQUFXO0FBQzFCLGVBQU8sR0FBRyxTQUFTLElBQUksTUFBTTtBQUFBLE1BQy9CO0FBQUEsSUFDRjtBQUFBLElBQ0EsZUFBZTtBQUFBO0FBQUEsTUFFYixVQUFVLENBQUMsS0FBSztBQUFBLE1BQ2hCLFFBQVE7QUFBQTtBQUFBLFFBRU4sU0FBUztBQUFBLFVBQ1AsS0FBSztBQUFBLFFBQ1A7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
