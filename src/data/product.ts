import type { Product } from "../types/product";

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=85`;

export const products: Product[] = [
  {
    id: 1,
    name: "Nike Air Max Classic — Red",
    category: "Running",
    audience: "Men's Shoes",
    price: 150,
    tag: "Iconic",
    image: img("photo-1542291026-7eec264c27ff"),
  },
  {
    id: 2,
    name: "Air Jordan 1 Retro High",
    category: "Basketball",
    audience: "Men's Shoes",
    price: 180,
    tag: "New Release",
    image: img("photo-1552346154-21d32810aba3"),
  },
  {
    id: 3,
    name: "Nike Air Force 1 '07",
    category: "Lifestyle",
    audience: "Men's Shoes",
    price: 115,
    tag: "Popular",
    image: img("photo-1595950653106-6c9ebd614d3a"),
  },
  {
    id: 4,
    name: "Nike Dunk Low Retro",
    category: "Lifestyle",
    audience: "Men's Shoes",
    price: 125,
    tag: "Trending",
    image: img("photo-1600185365483-26d7a4cc7519"),
  },
  {
    id: 5,
    name: "Nike Neon Performance Runner",
    category: "Running",
    audience: "Women's Road Running Shoes",
    price: 140,
    tag: "New",
    image: img("photo-1606107557195-0e29a4b5b4aa"),
  },
  {
    id: 6,
    name: "Nike Blazer Mid '77 Vintage",
    category: "Lifestyle",
    audience: "Women's Shoes",
    price: 105,
    image: img("photo-1582588678413-dbf45f4823e9"),
  },
  {
    id: 7,
    name: "Nike Air Zoom Athletic",
    category: "Running",
    audience: "Women's Road Running Shoes",
    price: 130,
    image: img("photo-1579338559194-a162d19bf842"),
  },
  {
    id: 8,
    name: "Nike Basketball Performance",
    category: "Basketball",
    audience: "Men's Basketball Shoes",
    price: 160,
    image: img("photo-1511556532299-8f662fc26c06"),
  },
  {
    id: 9,
    name: "Nike Flyknit Lightweight Trainer",
    category: "Training",
    audience: "Women's Workout Shoes",
    price: 150,
    image: img("photo-1539185441755-769473a23570"),
  },
  {
    id: 10,
    name: "Nike Air Max 270",
    category: "Lifestyle",
    audience: "Men's Shoes",
    price: 160,
    tag: "Bestseller",
    image: img("photo-1634624943287-6e1f2d103201"),
  },
];

export const filters = ["All", "Lifestyle", "Running", "Basketball", "Training"];


export const audienceFilters = ["All", "Men", "Women"];