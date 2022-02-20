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
