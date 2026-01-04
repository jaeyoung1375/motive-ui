import { useEffect, useState } from 'react';
import { post } from '~util/AxiosUtils';
import { Code } from '~types/Code';
import { INIT_PRODUCT, Product } from '~types/Product';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { pfnCodeList } from '~util/Common';
import Input from '~views/component/Input';
import Select from '~views/component/Select';
import Button from '~views/component/Button';

export default function EmployeeAdd() {
  const [addForm, setAddForm] = useState<Product>(INIT_PRODUCT);
  const [posit, setPosit] = useState<Code[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    statusList();
  }, []);

  const statusList = async () => {
    const res = await pfnCodeList('STATUS');
    setPosit(res.data);
  };

  /**
   * content: 상품 등록
   * return () => void
   */
  const handleAddEmployee = async (Product: Product) => {
    const res = await post<ApiResponse<string>>('/prod/add', Product);

    // 성공 시
    if (res.code === 200 && res.data) {
      alert('상품등록이 완료되었습니다.'); // [todo] 공통 알럿 만들어야 함
      navigate('/admin/employee/list');
    }
  };

  return (
    <>
      <div className="container mx-auto ">
        <form className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
          <Input
            text={'상품명'}
            value={addForm?.prodName}
            onChange={(e) =>
              setAddForm({ ...addForm, prodName: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="상품명을 입력하세요"
          />

          <Input
            text={'상품 가격'}
            value={addForm?.prodName}
            onChange={(e) =>
              setAddForm({ ...addForm, prodName: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="상품 가격을 입력하세요"
          />

          <Select
            text={'상품 상태'}
            value={addForm?.prodStatus}
            onChange={(e) =>
              setAddForm({ ...addForm, prodStatus: e.target.value })
            }
            list={posit}
          />
          <Button
            text={'상품 등록'}
            onClick={() => handleAddEmployee(addForm)}
            type={'POSITIVE'}
          />
        </form>
      </div>
    </>
  );
}
