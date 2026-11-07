
"use client";

import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "./CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />

        {product.oldPrice > product.price && (
          <span className="discount">
            {Math.round(
              ((product.oldPrice - product.price) /
                product.oldPrice) *
                100
            )}% OFF
          </span>
        )}
      </div>

      <div className="product-details">
        <span className="product-category">{product.category}</span>

        <h3>{product.name}</h3>

        <div className="rating">
          <Star size={14} fill="#f5a623" color="#f5a623" />
          <span>{product.rating}</span>
        </div>

        <div className="product-bottom">
          <div className="price">
            <strong>₹{product.price.toLocaleString("en-IN")}</strong>
            <del>₹{product.oldPrice.toLocaleString("en-IN")}</del>
          </div>

          <button
            className="add-cart"
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
