"use client";

import { fetchMenuList } from "app/features/menu/menu.api";
import SidebarClient from "./SidebarClient";
import { useEffect, useState } from "react";
import { Menu } from "app/features/menu/menu.type";

export default function Sidebar() {
  const [menuList, setMenuList] = useState<Menu[]>([]);

  useEffect(() => {
    const getMenu = async () => {
      const res = await fetchMenuList();
      setMenuList(res.data);
    };
    getMenu();
  }, []);

  // 메뉴 목록

  return (
    <>
      <SidebarClient menuList={menuList} />
    </>
  );
}
