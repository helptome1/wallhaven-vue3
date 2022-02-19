let BASE_URL = "";
const TIME_OUT = 10000;
// 导入环境变量
BASE_URL = import.meta.env.VITE_APP_BASEURL as string;

export { BASE_URL, TIME_OUT };
