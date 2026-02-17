import { get } from "@util/AxiosUtils";
import { Menu } from "./menu.type";

/** 메뉴 목록 조회 */
export const fetchMenuList = async () => {
  const res = await get<ApiResponse<Menu[]>>("/menu/list");

  return res;
};
