import request from "@/utils/request";

interface Searchparams {
  categories?: number,
  purity?: number,
  sorting?: string,
  page?: number
}
const getParams : Searchparams = {};

export const getHotPicture = (Params:any) => {
  return request.request({
    url: "/search",
    method: "GET",
    params: Params
  });
};
