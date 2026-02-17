import { get } from "@util/AxiosUtils";
import { Paging, PostListResponse } from "./post.type";

/** 게시물 조회 */
export const fetchPostList = async (paging: Paging) => {
  const res = await get<ApiResponse<PostListResponse>>("/posts", {
    params: paging,
  });

  return res;
};
