let BASE_URL = "";
let GetImage_BASE_URL = "";
const TIME_OUT = 10000;
// 导入环境变量
BASE_URL = import.meta.env.VITE_APP_BASEURL as string;
GetImage_BASE_URL = import.meta.env.VITE_GETIMAGE_BASEURL as string;
console.log("GetImage_BASE_URL", GetImage_BASE_URL);


export { BASE_URL, TIME_OUT, GetImage_BASE_URL };
