/**
 * 图片宽高比适应
 * @param {*} width 容器宽
 * @param {*} height 容器高
 * @param {*} ratio 图片宽高比
 */
export const aspectRatioToWH = (
  width: number,
  height: number,
  ratio: number,
  imageWidth: number,
  imageHeight: number
) => {
  let _r = width / height;
  if (imageWidth < width && imageHeight < height) {
    return { width: imageWidth, height: imageHeight };
  }
  if (_r > ratio) {
    return {
      width: height * ratio,
      height,
    };
  } else if (_r < ratio) {
    return {
      width,
      height: width / ratio,
    };
  } else {
    return {
      width,
      height,
    };
  }
};

/**
 * 获取时间 yyyy-MM-dd hh:mm:ss
 */
export const getTime = () => {
  let date = new Date();
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};
/**
 * 转换比特位单位
 * @param limit 转换的字节大小
 * @returns 带单位的字节
 */
export const byteTrans = (limit: number) => {
  var size = "";
  if (limit < 0.1 * 1024) {                            //小于0.1KB，则转化成B
    size = limit.toFixed(2) + "B"
  } else if (limit < 0.1 * 1024 * 1024) {            //小于0.1MB，则转化成KB
    size = (limit / 1024).toFixed(2) + "KB"
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {        //小于0.1GB，则转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + "MB"
  } else {                                            //其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB"
  }

  var sizeStr = size + "";                        //转成字符串
  var index = sizeStr.indexOf(".");                    //获取小数点处的索引
  var dou = sizeStr.substr(index + 1, 2)            //获取小数点后两位的值
  if (dou == "00") {                                //判断后两位是否为00，如果是则删除00                
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size;
}
/**
 * 防抖
 * @param {*} fn
 * @param {*} wait 延迟时间 默认1秒
 */
export const debounce = (fn: Function, wait = 1000) => {
  let timeout: any = null;
  return function (key: string, val: any) {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(key, val);
    }, wait);
  };
};

/**
 * 设置 localStorage中的图片数据
 * @param {*} key key
 * @param {*} val value
 */
export const setLocalData = (key: string, val: any) => {
  localStorage.setItem(key, JSON.stringify(val));
};

/**
 * 获取localStorage中的图片数据
 */
export const getLocalData = (key: string, val = []) => {
  let data = localStorage.getItem(key);
  if (!!data) {
    return JSON.parse(data);
  }
  return val;
};

/**
 * 更新下载列表
 * @param {*} arr
 */
const _updDownFiles = debounce(setLocalData, 1000);
export const addDownloadList = (arr: any) => {
  _updDownFiles("downLoading", arr);
};
/**
 * 获取下载列表
 */
export const getDownLoadingLists = () => {
  return getLocalData("downLoading");
};

/**
 * 获取下载完成数据
 */
export const getDownLoadedLists = () => {
  return getLocalData("DownLoaded");
};
/**
 * 更新下载完成列表
 * @param {*} arr
 */
const _updDownLoaded = debounce(setLocalData, 1000);
export const updDownLoaded = (arr: any) => {
  _updDownLoaded("DownLoaded", arr);
};

/**
 * 获取收藏数据
 */
export const getCollectData = () => {
  return getLocalData("collection");
};
/**
 * 设置收藏数据
 */
export const setCollectData = (collectArr: any) => {
  return getLocalData("collection", collectArr);
};
