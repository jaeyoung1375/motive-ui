import { useQuery } from "@tanstack/react-query";
import { fetchMenuList } from "./menu.api";

export const useMenuListQuery = () =>
  useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenuList,
  });
