
"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const {
    cart,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const [orderPlaced, setOrderPlaced] = useState(false);

  const shipping = cartTotal === 0 || cartTotal >= 999 ? 0 : 99;
  const finalTotal = cartTotal + shipping;

  function placeOrder() {
    if (cart.length === 0) return;

    setOrderPlaced(true);
    clearCart();
  }

  if (orderPlaced) {
    return (
      <section className="success-page">
        <div className="success-icon">✓</div>
        <h1>Order placed successfully!</h1>
        <p>Thank you for shopping with ShopNest.</p>
        <Link href="/products" className="checkout-button">
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-title">
        <span className="section-label">YOUR SHOPPING BAG</span>
        <h1>Shopping Cart</h1>
        <p>Review your items before checkout.</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <ShoppingBag size={48} />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <Link href="/products" className="checkout-button">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <span>{item.category}</span>
                  <h3>{item.name}</h3>
                  <strong>
                    ₹{item.price.toLocaleString("en-IN")}
                  </strong>

                  <div className="quantity-control">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={15} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>

                <div className="cart-item-right">
                  <strong>
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </strong>

                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="order-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString("en-IN")}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
            </div>

            <div className="free-shipping">
              {shipping === 0
                ? "You have free shipping!"
                : `Add ₹${(999 - cartTotal).toLocaleString("en-IN")} more for free shipping.`}
            </div>

            <div className="summary-total">
              <strong>Total</strong>
              <strong>₹{finalTotal.toLocaleString("en-IN")}</strong>
            </div>

            <button
              className="checkout-button full-width"
              onClick={placeOrder}
            >
              Place Order
            </button>

            <p className="checkout-note">
              Demo checkout only. No real payment will be processed.
            </p>
          </aside>
        </div>
      )}
    </section>
  );
}
