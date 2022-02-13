// import axios, {Method} from 'axios'

// const baseUrl = 'https://wallhaven.cc/api/v1/'
// const instance = axios.create({
//     baseURL: baseUrl,
//     timeout: 5000,
//     headers:{'Accept': 'application/json'}
// })
// /**
//  * 请求拦截器
//  */

// instance.interceptors.request.use(config=>{
//     return config
// },err => {
//     return Promise.reject(err)
// })

// /**
//  * 响应拦截器
//  */
// instance.interceptors.response.use(config=>{
//     return config
// },err=>{
//     return Promise.reject(err)
// })

// // 请求工具函数
// export default (url: string, method: Method, submitData?: any) => {
//     // 负责发请求：请求地址，请求方式，提交的数据
//     return instance({
//         url,
//         method,
//         // 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
//         // 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
//         // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
//         // method参数：get,Get,GET  转换成小写再来判断
//         // 在对象，['params']:submitData ===== params:submitData 这样理解
//         // [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
//     })
// }

/**
 * 这里使用原生ajax没有跨域问题，如果使用axios，会有跨域问题。实力有限，暂时无法解决。
 */
const baseURL = "https://wallhaven.cc/api/v1/";

export const ajax = (url: string) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", baseURL + url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200 || xhr.status === 304) {
        // debugger
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch (error) {
          resolve(xhr.responseText);
        }
      } else {
        reject(new Error(xhr.responseText));
      }
    };
    xhr.send();
  });
};
