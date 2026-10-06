import { useState } from "react";
import type { FormEvent } from "react";
import { Icon } from "./Icon";
import { Swoosh } from "./Swoosh";

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Swoosh light />
          <p>Move with purpose.</p>
        </div>
        <div className="newsletter">
          <span>First step’s on us</span>
          <h2>GET 15% OFF YOUR FIRST ORDER</h2>
          <form onSubmit={handleSubscribe}>
            <input type="email" required aria-label="Email address" placeholder="Email address" />
            <button aria-label="Subscribe">
              <Icon name="arrow" />
            </button>
          </form>
          {subscribed && <p className="success-message">You’re in. Check your inbox soon.</p>}
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-links">
          <a href="https://www.nike.com/help" target="_blank" rel="noopener noreferrer">
            Help & Support
          </a>
          <a
            href="https://www.nike.com/help/a/shipping-delivery-gs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Delivery & Returns
          </a>
          <a href="https://www.nike.com/retail" target="_blank" rel="noopener noreferrer">
            Find a Store
          </a>
          <a
            href="https://www.nike.com/help/a/terms-of-use"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms
          </a>
        </div>
        <div className="footer-meta">
          <span>© {new Date().getFullYear()} Nike, Inc.</span>
          <div className="socials">
            <a
              href="https://www.instagram.com/nike"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nike Instagram"
            >
              <Icon name="instagram" size={18} />
            </a>
            <a
              href="https://x.com/nike"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nike X"
            >
              <Icon name="x" size={16} />
            </a>
            <a
              href="https://www.youtube.com/user/nike"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nike YouTube"
            >
              <Icon name="youtube" size={19} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}