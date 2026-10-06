import { Icon } from "./Icon";
import type { CartItem } from "../types/product";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, delta: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
};

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 75;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>Your Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</h3>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty-state">
            <Icon name="bag" size={48} />
            <p>Your bag is empty.</p>
            <button className="primary-cta" onClick={onClose}>
              Explore Shoes
            </button>
          </div>
        ) : (
          <>
            <div className="cart-shipping-banner">
              {isFreeShipping ? (
                <span>🎉 You qualify for <strong>FREE Shipping!</strong></span>
              ) : (
                <span>
                  Add <strong>${(freeShippingThreshold - subtotal).toFixed(2)}</strong> more for FREE Shipping!
                </span>
              )}
            </div>

            <div className="cart-items-list">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="cart-item-card">
                  <img src={product.image} alt={product.name} />
                  <div className="cart-item-details">
                    <h4>{product.name}</h4>
                    <span className="cart-item-audience">{product.audience}</span>
                    <strong className="cart-item-price">${product.price.toFixed(2)}</strong>

                    <div className="cart-quantity-controls">
                      <button onClick={() => onUpdateQuantity(product.id, -1)} aria-label="Decrease quantity">
                        -
                      </button>
                      <span>{quantity}</span>
                      <button onClick={() => onUpdateQuantity(product.id, 1)} aria-label="Increase quantity">
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="cart-remove-btn"
                    onClick={() => onRemoveItem(product.id)}
                    aria-label={`Remove ${product.name}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
              <div className="cart-summary-row">
                <span>Estimated Shipping</span>
                <span>{subtotal >= freeShippingThreshold ? "FREE" : "$8.00"}</span>
              </div>
              <div className="cart-summary-row total-row">
                <span>Total</span>
                <strong>
                  ${(subtotal + (subtotal >= freeShippingThreshold ? 0 : 8)).toFixed(2)}
                </strong>
              </div>

              <button className="checkout-btn" onClick={onCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}