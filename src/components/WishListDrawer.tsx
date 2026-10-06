import { Icon } from "./Icon";
import type { Product } from "../types/product";

type WishlistDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  favorites: number[];
  products: Product[];
  onRemoveFavorite: (id: number) => void;
  onAddToCart: (product: Product) => void;
};

export function WishlistDrawer({
  isOpen,
  onClose,
  favorites,
  products,
  onRemoveFavorite,
  onAddToCart,
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  const favoritedProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>Your Favorites ({favoritedProducts.length})</h3>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close wishlist">
            ✕
          </button>
        </div>

        {favoritedProducts.length === 0 ? (
          <div className="cart-empty-state">
            <Icon name="heart" size={48} />
            <p>Your wishlist is currently empty.</p>
            <button className="primary-cta" onClick={onClose}>
              Explore Shoes
            </button>
          </div>
        ) : (
          <div className="cart-items-list" style={{ marginTop: "16px" }}>
            {favoritedProducts.map((product) => (
              <div key={product.id} className="cart-item-card">
                <img src={product.image} alt={product.name} />
                <div className="cart-item-details">
                  <h4>{product.name}</h4>
                  <span className="cart-item-audience">{product.audience}</span>
                  <strong className="cart-item-price">${product.price.toFixed(2)}</strong>

                  <button
                    className="wishlist-add-to-cart-btn"
                    onClick={() => {
                      onAddToCart(product);
                      onRemoveFavorite(product.id); // move it from favorites to the bag
                    }}
                  >
                    Add to Bag
                  </button>
                </div>
                <button
                  className="cart-remove-btn"
                  onClick={() => onRemoveFavorite(product.id)}
                  aria-label={`Remove ${product.name} from favorites`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}