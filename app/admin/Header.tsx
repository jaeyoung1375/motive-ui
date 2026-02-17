import Cookies from "js-cookie";
import { get } from "@util/AxiosUtils";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "@type/Menu";

export default function Header() {
  const [menu, setMenu] = useState<Menu[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [clickedId, setClickedId] = useState<string | null>(null);

  const isOpen = (id: string) => hoveredId === id || clickedId === id;

  /**
   * content : 메뉴 목록
   */
  const MenuList = async () => {
    const res = await get<ApiResponse<Menu[]>>("/menu/list");
    if (res.code === 200 && res.data) {
      const filteredMenu = res.data.filter((item) => {
        return item.upMenuId === null;
      });
      setMenu(filteredMenu);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    // 메뉴 목록 조회
    MenuList();

    const token = Cookies.get("token");
    if (token) {
      localStorage.setItem("token", token);
      Cookies.remove("token");
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="container mx-auto">
      <nav className="flex justify-center space-x-4">
        {isLoading &&
          menu?.map((item) => {
            const hasChild = item.children && item.children.length > 0;

            return (
              <Link
                key={item.menuId}
                to={item.menuUrl}
                className="relative group"
                onMouseEnter={() => setHoveredId(item.menuId)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => {
                  setClickedId((prev) =>
                    prev === item.menuId ? null : item.menuId,
                  );
                }}
              >
                <span className="font-bold px-3 py-2 text-slate-700 cursor-pointer">
                  {item.menuNm}
                </span>

                {/* dropdown */}
                {hasChild && (
                  <div
                    className="
                absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md
                min-w-[150px]
              "
                  >
                    {/* 하위 메뉴 렌더링 */}
                    {item.children.length > 0 && isOpen(item.menuId) && (
                      <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md">
                        {item.children.map((child) => (
                          <Link
                            to={child.menuUrl}
                            key={child.menuId}
                            className="block px-4 py-2 hover:bg-slate-100"
                          >
                            {child.menuNm}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
      </nav>
    </div>
  );
}
