import {request, imgRequest} from "@/utils/request";

interface Searchparams {
  categories?: number,
  purity?: number,
  sorting?: string,
  page?: number
}
const getParams : Searchparams = {};
/**
 * search获取图片列表，搜索组件使用它
 * @param Params 
 * @returns 
 */
export const getHotPicture = (Params:any) => {
  return request.request({
    url: "/search",
    method: "GET",
    params: Params
  });
};

export const getImage = (url:string) => {
  return imgRequest.request({
    url: url,
    method: "GET"
  })
}