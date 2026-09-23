import { useRouter } from "expo-router";
import type { Product } from "@/entities/product";

export function useOpenProduct() {
  const router = useRouter();

  return (product: Product) => {
    router.push({
      pathname: "/product/[id]",
      params: { id: product.id },
    });
  };
}
