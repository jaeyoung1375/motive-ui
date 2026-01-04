import { useEffect, useState } from 'react';
import { get, post } from '~util/AxiosUtils';
import { Code } from '~types/Code';
import { INIT_PRODUCT_OPTION, Product, ProductOption } from '~types/Product';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { pfnCodeList } from '~util/Common';

export default function EmployeeAdd() {
  const [addForm, setAddForm] = useState<ProductOption>(INIT_PRODUCT_OPTION);

  /* 상품 사이즈 */
  const [prodSize, setProdSize] = useState<Code[]>([]);
  /* 상품 색상 */
  const [prodColor, setProdColor] = useState<Code[]>([]);
  /* 상품 리스트  */
  const [prodList, setProdList] = useState<Product[]>([]);

  const num = 10;

  const navigate = useNavigate();

  useEffect(() => {
    // 상품 사이즈 조회
    prodsizeList();
    // 상품 색상 조회
    prodColorList();
    // 상품 목록 조회
    productList();
  }, []);

  /**
   * content : 상품목록 조회
   * return () => void
   */
  const productList = async () => {
    const res = await get<ApiResponse<Product[]>>('/prod/list');

    if (res.code === 200 && res.data) {
      setProdList(res.data);
    }
  };

  /**
   * content : 상품 사이즈 조회
   */
  const prodsizeList = async () => {
    const res = await pfnCodeList('PROD_SIZE');

    setProdSize(res.data);
  };

  /**
   * content : 상품 색상 조회
   */
  const prodColorList = async () => {
    const res = await pfnCodeList('PROD_COLOR');

    setProdColor(res.data);
  };

  /**
   * content: 상품 옵션 등록
   * return () => void
   */
  const handleAddEmployee = async (product: ProductOption) => {
    const res = await post<ApiResponse<string>>('/prod/option/add', product);

    // 성공 시
    if (res.code === 200 && res.data) {
      alert('상품등록이 완료되었습니다.'); // [todo] 공통 알럿 만들어야 함
      navigate('/admin/product/list');
    }
  };

  return (
    <>
      <div className="container mx-auto ">
        <form className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">상품명</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="employee_posit"
              value={addForm?.prodId}
              onChange={(e) =>
                setAddForm({ ...addForm, prodId: Number(e.target.value) })
              }
            >
              {prodList.map((item) => {
                return (
                  <option key={item.prodId} value={item.prodId}>
                    {item.prodName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">상품 사이즈</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="employee_posit"
              value={addForm?.sizeId}
              onChange={(e) =>
                setAddForm({ ...addForm, sizeId: Number(e.target.value) })
              }
            >
              {prodSize.map((item) => {
                return (
                  <option key={item.codeId} value={item.codeVal}>
                    {item.codeName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">상품 색상</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="employee_posit"
              value={addForm?.colorId}
              onChange={(e) =>
                setAddForm({ ...addForm, colorId: Number(e.target.value) })
              }
            >
              {prodColor.map((item) => {
                return (
                  <option key={item.codeId} value={item.codeVal}>
                    {item.codeName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">상품 재고</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="employee_posit"
              value={addForm?.stock}
              onChange={(e) =>
                setAddForm({ ...addForm, stock: Number(e.target.value) })
              }
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => handleAddEmployee(addForm)}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            상품등록
          </button>
        </form>
      </div>
    </>
  );
}
