import request from "@/utils/request";

interface Searchparams {
  categories?: number,
  purity?: number,
  sorting?: string,
  page?: number
}
const getParams : Searchparams = {};

export const getHotPicture = (getParams:any) => {
  return request.request({
    url: "/search",
    method: "GET",
    params: {
      categories: getParams.categories,
      purity: getParams.purity,
      sorting: getParams.sorting,
      page: getParams.page
    }
  });
};
