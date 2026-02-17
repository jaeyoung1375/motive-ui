import { Product } from "@type/Product";
import { get } from "@util/AxiosUtils";

export const ProductList = async () => {
  const res = await get<ApiResponse<Product[]>>("/prod/detail/list");
  console.log("res : ", res);
  return res;
};
