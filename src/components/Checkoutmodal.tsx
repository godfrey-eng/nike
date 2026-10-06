import { useEffect, useRef } from "react";
import type { CartItem } from "../types/product";

export type Order = {
  number: string;
  items: CartItem[];
  total: number;
};

type CheckoutModalProps = {
  order: Order | null;
  onClose: () => void;
};

export function CheckoutModal({ order, onClose }: CheckoutModalProps) {
  const doneRef = useRef<HTMLButtonElement>(null);

  // Focus the button and allow Esc to close while the modal is open
  useEffect(() => {
    if (!order) return;
    doneRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [order, onClose]);

  if (!order) return null;

  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <div
        className="checkout-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="checkout-check" aria-hidden="true">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>

        <span className="checkout-kicker">Order confirmed (demo)</span>
        <h3 id="checkout-title">THANK YOU!</h3>
        <p className="checkout-order-number">
          Order {order.number} · {itemCount} item{itemCount === 1 ? "" : "s"}
        </p>

        <div className="checkout-items">
          {order.items.map(({ product, quantity }) => (
            <div key={product.id} className="checkout-item">
              <img src={product.image} alt={product.name} />
              <div className="checkout-item-info">
                <strong>{product.name}</strong>
                <span>Qty: {quantity}</span>
              </div>
              <span className="checkout-item-price">
                ${(product.price * quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="checkout-total">
          <span>Total</span>
          <strong>${order.total.toFixed(2)}</strong>
        </div>

        <p className="checkout-demo-note">
          This is a demo store. No payment was processed and nothing will be shipped.
        </p>

        <button ref={doneRef} className="checkout-done-btn" onClick={onClose}>
          Continue shopping
        </button>
      </div>
    </div>
  );
}