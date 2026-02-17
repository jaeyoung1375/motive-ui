"use client";

import { Menu } from "app/features/menu/menu.type";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

type props = {
  menuList: Menu[];
};

export default function SidebarClient({ menuList }: props) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-slate-700">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuList.map((item) => (
            <MenuItem
              key={item.menuId}
              menu={item}
              openId={openId}
              onToggle={toggle}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}

function MenuItem({
  menu,
  openId,
  onToggle,
}: {
  menu: Menu;
  openId: string | null;
  onToggle: (id: string) => void;
}) {
  const hasChildren = menu.children && menu.children.length > 0;
  const isOpen = openId === menu.menuId;

  return (
    <div>
      <button
        onClick={() => {
          if (hasChildren) {
            onToggle(menu.menuId);
          }
        }}
        className="
          w-full flex items-center justify-between
          px-4 py-2 rounded
          hover:bg-slate-700
        "
      >
        <span>{menu.menuNm}</span>

        {hasChildren &&
          (isOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          ))}
      </button>
      {hasChildren && isOpen && (
        <ul className="ml-4 mt-1 space-y-1 border-l border-slate-700">
          {menu.children!.map((child) => (
            <li key={child.menuId}>
              <a
                href={child.menuUrl}
                className="
                  block px-4 py-2 rounded
                  text-sm text-slate-300
                  hover:bg-slate-700 hover:text-white
                "
              >
                {child.menuNm}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
