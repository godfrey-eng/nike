import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "./data/product";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { FilterBar } from "./components/FilterBar";
import { ProductCard } from "./components/ProductCard";
import { CartDrawer } from "./components/CartDrawer";
import { WishlistDrawer } from "./components/WishlistDrawer";
import { Footer } from "./components/Footer";
import { CheckoutModal, type Order } from "./components/CheckoutModal";
import type { Product, CartItem } from "./types/product";

export default function App() {
  const [activeFilter, setActiveFilter] = useState("All"); // category (navbar)
  const [audience, setAudience] = useState("All"); // Men / Women (filter bar)
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  // Theme: saved choice first, otherwise follow the system setting
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
    } catch {
      /* storage unavailable */
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage unavailable */
    }
  }, [isDark]);

  // Drawers State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [order, setOrder] = useState<Order | null>(null);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = products.filter(
      (product) =>
        (activeFilter === "All" || product.category === activeFilter) &&
        (audience === "All" || product.audience.startsWith(audience)) &&
        (!query ||
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.audience.toLowerCase().includes(query)),
    );

    return [...filtered].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      return a.id - b.id;
    });
  }, [activeFilter, audience, search, sort]);

  const toggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    // Restart the timer so rapid adds don't hide the newest toast early
    setToastMessage(`Added ${product.name} to bag`);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateQuantity = (productId: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null),
    );
  };

  const handleRemoveCartItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Demo checkout: snapshot the cart as an "order", then empty the cart
  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    const shipping = subtotal >= 75 ? 0 : 8; // same rule as CartDrawer

    setOrder({
      number: `DEMO-${Math.floor(100000 + Math.random() * 900000)}`,
      items: cartItems,
      subtotal,
      shipping,
      total: subtotal + shipping,
    });
    setCartItems([]);
    setIsCartOpen(false);
  };

  const clearFilters = () => {
    setSearch("");
    setActiveFilter("All");
    setAudience("All");
  };

  // "All Products" (and picking a search result) resets everything
  const handleSelectCategory = (category: string) => {
    setActiveFilter(category);
    if (category === "All") setAudience("All");
  };

  const scrollToCatalog = (category: string = "Lifestyle") => {
    setActiveFilter(category);
    setAudience("All");
    const catalogElem = document.getElementById("catalog");
    if (catalogElem) catalogElem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="site-shell">
      <div className="announcement">
        <p>Free shipping on orders $75+</p>
        <span>Members get early access</span>
      </div>

      <Navbar
        search={search}
        setSearch={setSearch}
        favorites={favorites}
        products={products}
        cartItems={cartItems}
        activeFilter={activeFilter}
        isDark={isDark}
        onToggleTheme={() => setIsDark((d) => !d)}
        onSelectCategory={handleSelectCategory}
        onRemoveFavorite={toggleFavorite}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      <main id="top">
        <HeroSection onShopClick={scrollToCatalog} />

        <section className="catalog" id="catalog">
          <div className="catalog-heading">
            <div>
              <span className="section-kicker">Latest collection</span>
              <h2>MADE TO MOVE</h2>
            </div>
            <p>
              Everyday icons and performance-first silhouettes,
              <br />
              selected for wherever you’re headed next.
            </p>
          </div>

          <FilterBar
            audience={audience}
            setAudience={setAudience}
            products={products}
            sort={sort}
            setSort={setSort}
          />

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={toggleFavorite}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>No results</span>
              <h3>
                {search.trim() ? `Nothing matches “${search.trim()}”` : "Nothing in this selection"}
              </h3>
              <button onClick={clearFilters}>Clear filters</button>
            </div>
          )}
        </section>
      </main>

      {toastMessage && (
        <div key={toastMessage} className="toast-notification">
          <span className="toast-check">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        favorites={favorites}
        products={products}
        onRemoveFavorite={toggleFavorite}
        onAddToCart={handleAddToCart}
      />

      <CheckoutModal order={order} onClose={() => setOrder(null)} />

      <Footer />
    </div>
  );
}