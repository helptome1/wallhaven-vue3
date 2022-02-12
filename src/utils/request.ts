import axios, {Method} from 'axios'

const baseUrl = 'https://wallhaven.cc/api/v1/'
const instance = axios.create({
    baseURL: baseUrl,
    timeout: 5000
})
/**
 * 请求拦截器
 */

instance.interceptors.request.use(config=>{
    return config
},err => {
    return Promise.reject(err)
})

/**
 * 响应拦截器
 */
instance.interceptors.response.use(config=>{

},()=>{

})

// 请求工具函数
export default (url: string, method: Method, submitData?: any) => {
    // 负责发请求：请求地址，请求方式，提交的数据
    return instance({
        url,
        method,
        // 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
        // 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
        // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
        // method参数：get,Get,GET  转换成小写再来判断
        // 在对象，['params']:submitData ===== params:submitData 这样理解
        [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
    })
}