/**
 * sorting
 * 排序结果的分类
 */
type sorting =
  | "hot"
  | "random"
  | "toplist"
  | "favorites"
  | "views"
  | "toplist";
  /**
   * order
   * desc按倒序排序(即：从大到小排序) ---降序排列
   * asc正序排序(即：从小到大排序)---升序排列
   */
type order = "desc" | "asc"; 
/**
 * ratios图片的尺寸
 */
type ratios = "16x9" | "16x10";
/**
 * 图片的类别
 * categories(general, anime, people)
 * 111即为全选，010为动漫，001为people
 */
type categories = '111' | '010' | "001";
export interface SearchParams {
  categories?: number | string,
  purity?: string[] | string,
  sorting?: sorting,
  page?: number,
  order?: order,
  ratios?: ratios
}
