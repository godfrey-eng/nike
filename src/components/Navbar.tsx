import { useState, type KeyboardEvent } from "react";
import { Icon } from "./Icon";
import { Swoosh } from "./Swoosh";
import type { Product, CartItem } from "../types/product";

type NavbarProps = {
  search: string;
  setSearch: (val: string) => void;
  favorites: number[];
  products: Product[];
  cartItems: CartItem[];
  activeFilter: string;
  isDark: boolean;
  onToggleTheme: () => void;
  onSelectCategory: (cat: string) => void;
  onRemoveFavorite: (id: number) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
};

function Highlight({ text, query }: { text: string; query: string }) {
  const i = query ? text.toLowerCase().indexOf(query) : -1;
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="search-mark">{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  );
}

export function Navbar({
  search,
  setSearch,
  favorites,
  products,
  cartItems,
  activeFilter,
  isDark,
  onToggleTheme,
  onSelectCategory,
  onRemoveFavorite,
  onOpenCart,
  onOpenWishlist,
}: NavbarProps) {
  const [isFavHovered, setIsFavHovered] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);

  // Live search across ALL products (ignores the active category filter)
  const query = search.trim().toLowerCase();
  const searchMatches = query
    ? products.filter((p) =>
        [p.name, p.category, p.audience].some((field) =>
          field.toLowerCase().includes(query),
        ),
      )
    : [];
  const suggestions = searchMatches.slice(0, 5);
  const showSearchPopover = isSearchOpen && query.length > 0;

  const goToCatalog = () => {
    onSelectCategory("All");
    setIsSearchOpen(false);
    setHighlighted(-1);
    (document.activeElement as HTMLElement | null)?.blur();
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectProduct = (product: Product) => {
    setSearch(product.name);
    goToCatalog();
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlighted >= 0 && suggestions[highlighted]) {
        handleSelectProduct(suggestions[highlighted]);
      } else {
        goToCatalog();
      }
    } else if (e.key === "Escape") {
      setIsSearchOpen(false);
      setHighlighted(-1);
    }
  };

  const navItems = ["All Products", "Running", "Basketball", "Lifestyle", "Training"];
  const favoritedItems = products.filter((p) => favorites.includes(p.id));

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <header className="header">
      <a className="brand" href="#top" aria-label="Nike home">
        <Swoosh />
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => {
          const category = item === "All Products" ? "All" : item;
          const isActive = activeFilter === category;

          return (
            <button
              key={item}
              className={`nav-link${isActive ? " active" : ""}`}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onSelectCategory(category)}
            >
              {item}
            </button>
          );
        })}
      </nav>

      <div className="header-actions">
        <div
          className="search-wrapper"
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setIsSearchOpen(false);
              setHighlighted(-1);
            }
          }}
        >
          <label className="search-field">
            <Icon name="search" size={18} />
            <input
              role="combobox"
              aria-expanded={showSearchPopover}
              aria-controls="search-results"
              aria-autocomplete="list"
              aria-label="Search products"
              placeholder="Search"
              autoComplete="off"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setIsSearchOpen(true);
                setHighlighted(-1);
              }}
              onFocus={() => setIsSearchOpen(true)}
              onKeyDown={handleSearchKeyDown}
            />
          </label>

          {showSearchPopover && (
            <div
              className="search-popover"
              id="search-results"
              role="listbox"
              onMouseDown={(e) => e.preventDefault()} // keep focus in the input
            >
              {suggestions.length === 0 ? (
                <p className="search-empty">No products match “{search.trim()}”</p>
              ) : (
                <>
                  {suggestions.map((product, i) => (
                    <button
                      key={product.id}
                      role="option"
                      aria-selected={i === highlighted}
                      className={`search-result${i === highlighted ? " highlighted" : ""}`}
                      onMouseEnter={() => setHighlighted(i)}
                      onClick={() => handleSelectProduct(product)}
                    >
                      <img src={product.image} alt="" />
                      <span className="search-result-info">
                        <strong>
                          <Highlight text={product.name} query={query} />
                        </strong>
                        <span>
                          {product.audience} · {product.category}
                        </span>
                      </span>
                      <span className="search-result-price">
                        ${product.price.toFixed(2)}
                      </span>
                    </button>
                  ))}
                  <button className="search-view-all" onClick={goToCatalog}>
                    View all {searchMatches.length} result
                    {searchMatches.length === 1 ? "" : "s"}
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Dark mode toggle */}
        <button
          className="icon-button theme-toggle"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Light mode" : "Dark mode"}
          onClick={onToggleTheme}
        >
          {isDark ? (
            // Sun icon
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            // Moon icon
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          )}
        </button>

        {/* Wishlist Rollover + Click Handler */}
        <div
          className="wishlist-wrapper"
          onMouseEnter={() => setIsFavHovered(true)}
          onMouseLeave={() => setIsFavHovered(false)}
        >
          <button
            className="icon-button desktop-only"
            aria-label="View wishlist"
            onClick={onOpenWishlist}
          >
            <Icon name="heart" />
            {favorites.length > 0 && <span className="dot" />}
          </button>

          {isFavHovered && (
            <div className="wishlist-popover">
              <div className="wishlist-header">
                <h4>Favorites ({favoritedItems.length})</h4>
              </div>

              {favoritedItems.length === 0 ? (
                <div className="wishlist-empty">
                  <p>Your favorites list is empty.</p>
                </div>
              ) : (
                <>
                  <div className="wishlist-items">
                    {favoritedItems.map((item) => (
                      <div key={item.id} className="wishlist-item">
                        <img src={item.image} alt={item.name} />
                        <div className="wishlist-item-info">
                          <strong>{item.name}</strong>
                          <span>${item.price.toFixed(2)}</span>
                        </div>
                        <button
                          className="remove-fav-btn"
                          onClick={() => onRemoveFavorite(item.id)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <button className="popover-view-all-btn" onClick={onOpenWishlist}>
                    View All Favorites
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Cart Popover Container */}
        <div
          className="cart-wrapper"
          onMouseEnter={() => setIsCartHovered(true)}
          onMouseLeave={() => setIsCartHovered(false)}
        >
          <button
            className="icon-button cart-button"
            aria-label={`${cartCount} items in cart`}
            onClick={onOpenCart}
          >
            <Icon name="bag" />
            <span className="cart-count">{cartCount}</span>
          </button>

          {isCartHovered && (
            <div className="cart-popover">
              <div className="cart-popover-header">
                <h4>Your Bag ({cartCount})</h4>
              </div>

              {cartItems.length === 0 ? (
                <div className="wishlist-empty">
                  <p>Your bag is empty.</p>
                </div>
              ) : (
                <>
                  <div className="cart-popover-items">
                    {cartItems.map(({ product, quantity }) => (
                      <div key={product.id} className="cart-popover-item">
                        <img src={product.image} alt={product.name} />
                        <div className="cart-popover-info">
                          <strong>{product.name}</strong>
                          <span>
                            Qty: {quantity} · ${(product.price * quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="cart-popover-footer">
                    <div className="cart-popover-subtotal">
                      <span>Subtotal:</span>
                      <strong>${cartSubtotal.toFixed(2)}</strong>
                    </div>
                    <button className="popover-checkout-btn" onClick={onOpenCart}>
                      View Bag & Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}