import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchPostList } from "app/features/post/post.api";
import { createQueryClient } from "app/lib/queryClient";
import PostList from "./PostList";
import { Paging } from "app/features/post/post.type";
import PostAdd from "./PostAdd";
import TestForm from "./PostAdd";

export default async function Page(mode: string) {
  const paging: Paging = {
    page: 1,
    pageSize: 10,
    pageBlock: 10,
  };

  // const queryClient = createQueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ["post", paging],
  //   queryFn: () => fetchPostList(paging),
  // });

  // return (
  //   <HydrationBoundary state={dehydrate(queryClient)}>
  //     <PostList />
  //   </HydrationBoundary>
  // );

  return <TestForm />;
}
