/*
 **全局注册组件
 ** 放在components/dashboard文件夹下
 */
import { defineAsyncComponent } from "vue";
// vite中导入全局组件的方式，不能使用webpack的那种方式了。
const components = import.meta.glob("./dashboard/*.vue"); // 异步方式
// console.log(components);

export default function install(app: any) {
  for (const [key, value] of Object.entries(components)) {
    const name = key.slice(key.lastIndexOf("/") + 1, key.lastIndexOf("."));
    app.component(name, defineAsyncComponent(value));
  }
}
