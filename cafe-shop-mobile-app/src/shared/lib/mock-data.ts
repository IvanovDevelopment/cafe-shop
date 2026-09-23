import { Category, Product } from "@/entities/product/model/types";

export const categories: Category[] = [
  { id: "coffee", name: "Кофе", icon: "☕" },
  { id: "tea", name: "Чай", icon: "🍵" },
  { id: "pastry", name: "Выпечка", icon: "🥐" },
  { id: "breakfast", name: "Завтраки", icon: "🍳" },
];

export const products: Product[] = [
  {
    id: "cappuccino",
    name: "Капучино",
    description: "Классический капучино с плотной молочной пенкой",
    price: 250,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400",
    categoryId: "coffee",
    availableSizes: ["S", "M", "L"],
    addons: [
      { id: "syrup", name: "Сироп", price: 50 },
      { id: "extra-shot", name: "Двойной shot", price: 70 },
    ],
    isPopular: true,
  },
  {
    id: "latte",
    name: "Латте",
    description: "Мягкий кофе с молоком и лёгкой пенкой",
    price: 270,
    image: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400",
    categoryId: "coffee",
    availableSizes: ["S", "M", "L"],
    isPopular: true,
  },
  {
    id: "croissant",
    name: "Круассан",
    description: "Свежий слоёный круассан с маслом",
    price: 180,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400",
    categoryId: "pastry",
    isPopular: true,
  },
  {
    id: "cheesecake",
    name: "Чизкейк",
    description: "Нежный чизкейк с ягодным соусом",
    price: 320,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400",
    categoryId: "pastry",
  },
  {
    id: "green-tea",
    name: "Зелёный чай",
    description: "Свежезаваренный зелёный чай с жасмином",
    price: 150,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
    categoryId: "tea",
    availableSizes: ["M", "L"],
  },
  {
    id: "omelette",
    name: "Омлет с овощами",
    description: "Пышный омлет с болгарским перцем и шпинатом",
    price: 290,
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400",
    categoryId: "breakfast",
  },
];
