import { Icon } from "./Icon";
import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onAddToCart: (product: Product) => void;
};

export function ProductCard({
  product,
  index,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <button
          className={isFavorite ? "favorite-button selected" : "favorite-button"}
          aria-label={`${isFavorite ? "Remove" : "Add"} ${product.name} ${
            isFavorite ? "from" : "to"
          } favorites`}
          onClick={() => onToggleFavorite(product.id)}
        >
          <Icon name="heart" size={19} />
        </button>
        <span className="product-index">0{index + 1}</span>
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <div>
          <h3>{product.name}</h3>
          <p>{product.audience}</p>
        </div>
        <div className="product-purchase">
          <strong>${product.price.toFixed(2)}</strong>
          <button
            className="quick-add"
            onClick={() => onAddToCart(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            <span>Quick add</span>
            <b>+</b>
          </button>
        </div>
      </div>
    </article>
  );
}