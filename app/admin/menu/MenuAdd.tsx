import { get, post } from "@util/AxiosUtils";
import Button from "@component/Button";
import Input from "@component/Input";
import { INIT_MENU, type Menu } from "@type/Menu";
import { useEffect, useState } from "react";
import { pfnCodeList } from "@util/Common";
import { Code } from "@type/Code";
import Select from "@component/Select";

export default function MenuAdd() {
  const [addForm, setAddForm] = useState<Menu>(INIT_MENU);
  const [useYn, setUseYn] = useState<Code[]>([]);
  const [topYn, setTopYn] = useState<Code[]>([]);
  const [clickedId, setClickedId] = useState<string | null>(null);

  /**
   * content : 메뉴 등록
   */
  const pfnMenuAdd = async (menu: Menu) => {
    const res = await post<ApiResponse<string>>("/menu/add", menu);
  };

  const statusList = async () => {
    const res = await pfnCodeList("STATUS");
    setUseYn(res.data);
    setTopYn(res.data);
  };

  // eslint-disable-next-line react-hooks/set-state-in-render
  statusList();

  return (
    <>
      <div className="container mx-auto ">
        <form className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
          <Input
            text={"메뉴ID"}
            placeholder={"메뉴ID를 입력하세요"}
            value={addForm?.menuId}
            onChange={(e) => setAddForm({ ...addForm, menuId: e.target.value })}
          />

          <Input
            text={"메뉴명"}
            placeholder={"메뉴명을 입력하세요"}
            value={addForm?.menuNm}
            onChange={(e) => setAddForm({ ...addForm, menuNm: e.target.value })}
          />
          <Input
            text={"메뉴URL"}
            placeholder={"메뉴 URL을 입력하세요"}
            value={addForm?.menuUrl}
            onChange={(e) =>
              setAddForm({ ...addForm, menuUrl: e.target.value })
            }
          />
          <Input
            text={"메뉴LEVEL"}
            placeholder={"메뉴 LEVEL을 입력하세요"}
            value={addForm?.menuLevel?.toString()}
            onChange={(e) =>
              setAddForm({ ...addForm, menuLevel: Number(e.target.value) })
            }
          />
          <Input
            text={"메뉴 정렬순서"}
            placeholder={"메뉴 정렬순서를 입력하세요"}
            value={addForm?.menuOrd}
            onChange={(e) =>
              setAddForm({ ...addForm, menuOrd: e.target.value })
            }
          />
          <Input
            text={"상위메뉴ID"}
            placeholder={"상위메뉴ID 를 입력하세요"}
            value={addForm?.upMenuId}
            onChange={(e) =>
              setAddForm({ ...addForm, upMenuId: e.target.value })
            }
          />
          <Select
            text={"최상위여부"}
            list={topYn}
            value={addForm?.topYn}
            onChange={(e) => setAddForm({ ...addForm, topYn: e.target.value })}
          />

          <Select
            text={"사용여부"}
            list={useYn}
            value={addForm.useYn}
            onChange={(e) => setAddForm({ ...addForm, useYn: e.target.value })}
          />

          <Button
            type={"POSITIVE"}
            text={"메뉴등록"}
            onClick={() => {
              pfnMenuAdd(addForm);
            }}
          />
        </form>
      </div>
    </>
  );
}
