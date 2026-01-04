import { useEffect, useState } from 'react';
import { get } from '~util/AxiosUtils';
import type { Product } from '~types/Product';
export default function EmployList() {
  const [prodList, setProdList] = useState<Product[]>([]);

  /**
   * content : 상품목록 조회
   * return () => void
   */
  const productList = async () => {
    const res = await get<ApiResponse<Product[]>>('/prod/detail/list');

    if (res.code === 200 && res.data) {
      setProdList(res.data);
    }
  };

  useEffect(() => {
    productList();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">상품 목록</h2>

        <ul className="bg-white shadow rounded-md divide-y">
          {/* 헤더 */}
          <li className="px-4 py-2 font-bold bg-slate-100 flex justify-between">
            <span className="text-slate-500 basis-1/6 text-center">
              상품아이디
            </span>
            <span className="text-slate-500 basis-1/6 text-center">상품명</span>
            <span className="text-slate-500 basis-1/6 text-right">
              상품가격
            </span>
            <span className="text-slate-500 basis-1/6 text-center">
              상품 재고
            </span>
            <span className="text-slate-500 basis-1/6 text-center">
              상품 사이즈
            </span>
            <span className="text-slate-500 basis-1/6 text-center">
              상품 색상
            </span>
            <span className="text-slate-500 basis-1/6 text-center">생성일</span>
          </li>

          {/* 데이터 */}
          {prodList.map((prod: Product) => (
            <li
              key={prod.prodId}
              className="px-4 py-2 hover:bg-slate-50 flex justify-between"
            >
              <span className="text-slate-500 basis-1/6 text-center">
                {prod.prodId}
              </span>
              <span className="text-slate-500 basis-2/6 text-center">
                {prod.prodName}
              </span>
              <span className="text-slate-500 basis-1/6 text-center">
                {prod.prodPrice.toLocaleString()}
              </span>
              <span className="text-slate-500 basis-2/6 text-center">
                {prod.stock}
              </span>
              <span className="text-slate-500 basis-2/6 text-center">
                {prod.prodSize}
              </span>
              <span className="text-slate-500 basis-2/6 text-center">
                {prod.prodColor}
              </span>
              <span className="text-slate-500 basis-1/6 text-center">
                {prod.createDt.toString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
