import request from "@/utils/request";

export const getHotPicture = () => {
  return request.request({
    url: "/search?categories=111&purity=100&sorting=hot&page=1",
    method: "GET",
  });
};
