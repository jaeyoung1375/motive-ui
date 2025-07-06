import { defineStore } from "pinia";
import { ref } from "vue";

const menuList = ref<Menu[]>([]);
export  const menuDto = ref<Menu>({
  menuId: '',
  menuName: '',
  menuUrl: '',
  menuLevel: 0,
  menuSorting: 0,
  upMenuId: '',
  useYn: '',
  registerId: '',
  registerDate: '',
  changeId: '',
  changeDate: ''
});

export const defaultMenuDto: Menu = {
  menuId: '',
  menuName: '',
  menuUrl: '',
  menuLevel: 0,
  menuSorting: 0,
  upMenuId: '',
  useYn: '',
  registerId: '',
  registerDate: '',
  changeId: '',
  changeDate: ''
}

export const useMenuStore = defineStore('menu', () => {
  const menus = ref<Menu[]>([])

  const setMenus = (menuList: Menu[]) => {
    menus.value = menuList
  }

  return {
    menus,
    setMenus,
  }
})