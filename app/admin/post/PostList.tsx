"use client";

import Pagination from "@component/Pagination";
import { usePostListQuery } from "app/features/post/post.query";
import { Paging, Post } from "app/features/post/post.type";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function PostList() {
  const { register, handleSubmit, reset, watch, control } = useForm();

  const [paging, setPaging] = useState<Paging>({
    page: 1,
    pageSize: 10,
    pageBlock: 10,
  });

  // 게시판 목록 조회
  const { data } = usePostListQuery(paging);

  const postList: Post[] = data?.data.postList ?? [];

  // 게시물 전체 개수
  const totalCnt = data?.data.totalCnt ?? 0;

  // paging 이동 함수
  const handleOnChange = (page: number) => {
    setPaging((prev) => ({
      ...prev,
      page: page,
    }));
  };

  return (
    <>
      <table className="w-full border-t">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2">번호</th>
            <th className="px-3 py-2 text-left">제목</th>
            <th className="px-3 py-2">조회수</th>
            <th className="px-3 py-2">등록일</th>
            <th className="px-3 py-2">상태</th>
            <th className="px-3 py-2">관리</th>
          </tr>
        </thead>
        {data && (
          <tbody>
            {postList.map((post, idx) => (
              <tr key={post.postId} className="border-b hover:bg-gray-50">
                <td className="px-3 py-2 text-center">{post.postId}</td>

                <td className="px-3 py-2 text-left font-medium">
                  {post.title}
                </td>

                <td className="px-3 py-2 text-center">👁 {post.viewCnt}</td>

                <td className="px-3 py-2 text-center">{post.createDt}</td>

                <td className="px-3 py-2 text-center">
                  <span
                    className={post.useYn ? "text-green-600" : "text-gray-400"}
                  >
                    {post.useYn ? "노출" : "미노출"}
                  </span>
                </td>

                <td className="px-3 py-2 text-center">
                  <button className="text-blue-600">수정</button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {/* 페이징 컴포넌트 */}
      <Pagination
        totalCnt={totalCnt}
        page={paging.page}
        pageSize={paging.pageSize}
        pageBlock={paging.pageBlock}
        onChange={handleOnChange}
      />
    </>
  );
}
