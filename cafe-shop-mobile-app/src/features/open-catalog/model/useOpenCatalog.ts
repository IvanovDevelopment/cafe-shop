import { useRouter } from "expo-router";
import type { Category } from "@/entities/product";

export function useOpenCatalog() {
  const router = useRouter();

  return (category?: Category) => {
    router.push({
      pathname: "/catalog",
      params: category ? { categoryId: category.id } : {},
    });
  };
}
