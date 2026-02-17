"use client";

interface props {
  totalCnt: number;
  page: number;
  pageSize: number;
  pageBlock: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  totalCnt,
  page,
  pageSize,
  pageBlock,
  onChange,
}: props) {
  // 전체 페이지 수
  const totalPage = Math.ceil(totalCnt / pageSize);

  // 블록 시작 페이지
  const startPage = Math.floor((page - 1) / pageBlock) * pageBlock + 1;
  // 블락 끝 페이지
  const endPage = Math.min(startPage + pageBlock - 1, totalPage);

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      {/* 이전 페이지 */}
      <button className="px-3 py-1 border rounded hover:bg-gray-100">{`<`}</button>

      {/* 페이지 번호 1~10 */}

      {Array.from({ length: endPage - startPage + 1 }).map((_, idx) => {
        const pageNum = startPage + idx;
        return (
          <button
            key={pageNum}
            className={`px-3 py-1 text-sm rounded-md border transition ${
              page === pageNum
                ? "bg-blue-600 text-white border-blue-600 font-semibold"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            } `}
            onClick={() => onChange(pageNum)}
          >
            {pageNum}
          </button>
        );
      })}

      {/* 다음 페이지 */}
      <button className="px-3 py-1 border rounded hover:bg-gray-100">{`>`}</button>
    </div>
  );
}
