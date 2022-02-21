import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from "path";

/**
 * 获取绝对路径
 * @param dir
 */
function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

export default defineConfig({
  plugins: [
    vue(),
    // 按需导入element-plus组件
    Components({ resolvers: [ElementPlusResolver()] }),
  ],
  resolve: {
    alias: [
      {
        find: /\@\//,
        replacement: pathResolve("src") + "/",
      },
    ],
  },
  base: "./",
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        /*
                  引入var.scss全局预定义变量，
                  如果引入多个文件，
                  可以使用
                  '@import "@/assets/scss/globalVariable1.scss";@import "@/assets/scss/globalVariable2.scss";'
                  这种格式
                   */
        additionalData: `@import "./src/assets/styles/global.less";`,
      }
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api/v1': {
        target: 'https://wallhaven.cc',
        changeOrigin: true,
      },
      '/full': {
        target: 'https://w.wallhaven.cc',
        changeOrigin: true,
      }
    },
  },
});
