import { del, get, post, put } from "~/api/useAxios";
import { defaultMenuDto, menuDto } from "~/stores/menu";
import { ref, type Ref } from "vue";
export const selectedMode = ref<'detail' | 'create'>('detail')
// 메뉴 리스트
export  const menuData = async (menuList: Ref<Menu[]>, useYn?: string) => {
  try{
    const data = await get<Menu[]>('/menu', {params: {useYn}})
    menuList.value = data.data;
    console.log( menuList.value)
    return menuList;
  } catch(error) {
      console.error('메뉴 리스트 조회 실패: ', error);
    };
}

// 메뉴 상세
export const getMenu = async (menuId: string)  => {
  try{
    const data = await get<Menu>(`/menu/${menuId}`)
    menuDto.value = data.data;
    selectedMode.value = 'detail';
  } catch(error) {
      console.error('메뉴상세 조회 실패: ', error);
    }
}

// 메뉴 수정
export const modifyMenu = async (menuDto: Menu): Promise<Menu> => {
  try{
    const data = await put<Menu>(`/menu/${menuDto.menuId}`, menuDto ,{ withCredentials: true })
    return data.data;
  } catch(error) {  
    console.error('메뉴 수정 실패: ' , error)
    throw error;
  }
}

// 메뉴 삭제
export const removeMenu = async (menuId: string) => {
  try{
      const data = await del(`/menu/${menuId}`)
  } catch(error) {
    console.error('메뉴삭제 실패: ', error);
  }
}

// 메뉴 등록
export const createMenu = async (menuDto: Menu) => {
  try{
      const data = await post('/menu', menuDto)
  } catch(error) {
    console.error('메뉴등록 실패: ', error);
  }
}