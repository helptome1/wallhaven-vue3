
/**
* Data接口中的对象类型
*/
interface Thumbs {
  large: string;
  original: string;
  small: string;
}

/**
 * sorting
 * 排序结果的分类
 */
type Sorting = "hot" | "random" | "toplist" | "favorites" | "views" | "toplist";
/**
 * order
 * desc按倒序排序(即：从大到小排序) ---降序排列
 * asc正序排序(即：从小到大排序)---升序排列
 */
type Order = "desc" | "asc";
/**
 * ratios图片的尺寸
 */
type Ratios = "16x9" | "16x10";
/**
 * 图片的类别
 * categories(general, anime, people)
 * 111即为全选，010为动漫，001为people
 */
type Categories = "111" | "010" | "001";

/**
 * Purity图片的纯净程度，(sfw/sketchy/nsfw)对应（100/110/111）
 */
type Purity = string[] | string

/**
 * SearchParams, 查询参数
 */
export interface SearchParams {
  list: {
    categories?: Categories;
    purity?: Purity;
    sorting?: Sorting;
    page?: number;
    order?: Order;
    ratios?: Ratios;
    // 最低图片质量
    atleast?: any
  };
}

/**
 * 定义meta声明，获取图片信息的数据格式。
 */
export interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  query?: any;
  seed?: any;
}

/**
* Data 获取图片的数据格式
*/
export interface Data {
  id: string;
  url: string;
  short_url: string;
  views: number;
  favorites: number;
  source: string;
  purity: string;
  categories: string;
  dimension_x: number;
  dimension_y: number;
  resolution: string;
  ratio: string;
  file_size: number;
  file_type: string;
  created_at: string;
  colors: string[];
  path: string;
  thumbs: Thumbs;
}