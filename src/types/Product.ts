export type Product = {
  prodId?: number;
  prodName: string;
  prodPrice: number;
  stock?: number;
  prodSize?: string;
  prodColor?: string;
  cateId?: number;
  prodStatus: string;
  imageUrl: string;
  createDt: Date;
  creater: string;
  updateDt: Date;
  updater: string;
};

export type ProductOption = {
  prodId?: number;
  sizeId: number;
  colorId: number;
  stock: number;
};

export const INIT_PRODUCT: Product = {
  prodName: '',
  prodPrice: 0,
  prodStatus: 'Y',
  imageUrl: '',
  createDt: new Date(),
  creater: '',
  updateDt: new Date(),
  updater: ''
};

export const INIT_PRODUCT_OPTION: ProductOption = {
  prodId: 0,
  sizeId: 0,
  colorId: 0,
  stock: 0
};
