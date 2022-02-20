import axios, { Axios, Method } from "axios";
//引入axios实例类型
import type { AxiosInstance, AxiosRequestConfig } from "axios";
//引入自己封装的接口，实现拦截器的合法传入
import { RequestInterceptors, RequestConfig } from "../model/index";

class HYRequest {
  instance: AxiosInstance;
  interceptors?: RequestInterceptors;

  //这里的config: HYRequestConfig类型是由于AxiosRequestConfig中不能接收拦截器的参数
  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
  }

  //使用request测试是否成功
  request(config: AxiosRequestConfig) {
    return this.instance(config);
  }
}
export default HYRequest;
