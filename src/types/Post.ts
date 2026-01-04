export type Post = {
  postId: number;
  title: string;
  content: string;
  writer: string;
  folder: string;
  category: string;
  viewCnt: number;
  commentCnt: number;
  useYn: string;
  createdDt: Date;
  updatedDt: Date;
  updator: string;
};
