import request from "@/utils/request";

export const getHotPicture = () => {
  return request.request({
    url: "/search",
    method: "GET",
    params: {
      categories: 112,
      purity: 100,
      sorting: 'hot',
      page: 1
    }
  });
};
