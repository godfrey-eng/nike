export type Category = "Lifestyle" | "Running" | "Basketball" | "Training";

export type Product = {
  id: number;
  name: string;
  category: Category;
  audience: string;
  price: number;
  tag?: "New Release" | "Popular";
  image: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};