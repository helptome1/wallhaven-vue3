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
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
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
  }
}

/**
 * 设置 localStorage中的图片数据
 * @param {*} key key
 * @param {*} val value
 */
export const setLocalData = (key: string, val: any) => {
  localStorage.setItem(key, JSON.stringify(val))
}

/**
 * 获取localStorage中的图片数据
 */
export const getLocalData = (key: string, val = []) => {
  let data = localStorage.getItem(key)
  if (data) {
    return JSON.parse(data)
  }
  return val
}

/**
 * 更新下载列表
 * @param {*} arr 
 */
const _updDownFiles = debounce(setLocalData, 1000)
export const updDownFiles = (arr: any) => {
  _updDownFiles('DownFiles', arr)
}
/**
 * 获取下载列表
 */
export const getDownLists = () => {
  return getLocalData('DownFiles')
}

/**
 * 获取下载完成数据
 */
export const getDownLoaded = () => {
  return getLocalData('DownLoaded');
}
/**
 * 更新下载完成列表
 * @param {*} arr 
 */
const _updDownLoaded = debounce(setLocalData, 1000)
export const updDownLoaded = (arr: any) => {
  _updDownLoaded('DownLoaded', arr)
}
