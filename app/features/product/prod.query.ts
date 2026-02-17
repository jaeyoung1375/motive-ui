import { useQuery } from "@tanstack/react-query";
import { ProductList } from "app/features/product/prod.api";

export const useProductListQuery = () =>
  useQuery({
    queryKey: ["product"],
    queryFn: ProductList,
  });
