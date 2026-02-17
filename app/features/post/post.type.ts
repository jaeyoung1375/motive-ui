export type Post = {
  postId?: number;
  title?: string;
  content?: string;
  writer?: string;
  folder?: string;
  category?: string;
  viewCnt?: number;
  commentCnt?: number;
  useYn?: string;
  createDt?: string;
  updateDt?: string;
  updator?: string;
};

export type Paging = {
  page: number;
  pageSize: number;
  pageBlock: number;
};

export type PostListResponse = {
  postList: Post[];
  totalCnt: number;
};
