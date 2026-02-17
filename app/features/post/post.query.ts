import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPostList } from "app/features/post/post.api";
import { Paging } from "./post.type";

export const usePostListQuery = (paging: Paging) =>
  useQuery({
    queryKey: ["post", paging],
    queryFn: () => fetchPostList(paging),
    placeholderData: keepPreviousData,
  });
