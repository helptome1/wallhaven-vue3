/**
 * 定义meta声明
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
 * Data接口中的对象
 */
interface Thumbs {
    large: string;
    original: string;
    small: string;
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
