export type Menu = {
  menuId: string;
  menuNm?: string;
  menuUrl: string;
  menuLevel?: number;
  menuOrd?: string;
  upMenuId?: string;
  topYn?: string;
  useYn?: string;
  regId?: string;
  regDt?: string;
  children: Menu[];
};

export const INIT_MENU: Menu = {
  menuId: '',
  menuNm: '',
  menuUrl: '',
  menuLevel: 0,
  menuOrd: '',
  upMenuId: '',
  topYn: '',
  useYn: '',
  children: []
};
