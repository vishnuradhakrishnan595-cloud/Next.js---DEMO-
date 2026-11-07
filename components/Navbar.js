
"use client";

import Link from "next/link";
import { ShoppingBag, Search } from "lucide-react";
import { useCart } from "./CartContext";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <Link href="/" className="logo">
        SHOP<span>NEST.</span>
      </Link>

      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <a href="/#categories">Categories</a>
      </div>

      <div className="nav-actions">
        <Link href="/products" className="search-link">
          <Search size={19} />
        </Link>

        <Link href="/cart" className="cart-link">
          <ShoppingBag size={21} />
          <span>Cart</span>
          <span className="cart-count">{cartCount}</span>
        </Link>
      </div>
    </nav>
  );
}
