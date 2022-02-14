import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface RequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (config: AxiosResponse) => AxiosResponse;
  responseInterceptorCatch?: (error: any) => any;
}

// 接口继承接口，并且拓展接口的业务。
export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors;
}
