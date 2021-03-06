
import { SearchParams } from "../../types/interface";

/**
 * 转换可用的parmas
 * @param searchList 当前页面的参数。
 * @param data 用户选择搜索列表的参数。
 * @returns 合并之后的参数
 */
export const objToParams = ( searchList: SearchParams, data: SearchParams) => {
    searchList.list = { ...searchList.list, ...data.list };
    searchList.isSearch = true;
    /**
     * 把数组类型的参数转换成字符串。
     */
    if ((data.list.purity as string[]).length <= 1) {
        searchList.list.purity =
            !(data.list.purity as string[])[0] ||
                (data.list.purity as string[])[0] === "SFW"
                ? "SFW"
                : "Sketchy";
    } else {
        searchList.list.purity = "110";
    }
    return searchList
};

