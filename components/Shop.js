
"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { products } from "./products";
import ProductCard from "./ProductCard";

export default function Shop({ showHero = true }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Fashion", "Electronics", "Accessories"];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <>
      {showHero && (
        <section className="hero">
          <div className="hero-content">
            <span className="hero-label">WELCOME TO SHOPNEST</span>
            <h1>
              Discover your
              <br />
              <span>next favourite.</span>
            </h1>

            <p>
              Explore products you'll love. Great style, great technology
              and everyday essentials in one place.
            </p>

            <a href="#products" className="hero-button">
              Shop Now →
            </a>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1100"
              alt="Shopping store"
            />
          </div>
        </section>
      )}

      <section className="category-section" id="categories">
        <div className="section-heading">
          <div>
            <span className="section-label">EXPLORE COLLECTIONS</span>
            <h2>Shop by Category</h2>
          </div>
        </div>

        <div className="category-list">
          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() => {
                setCategory(item);
                document.getElementById("products")?.scrollIntoView({
                  behavior: "smooth"
                });
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="products-section" id="products">
        <div className="section-heading product-heading">
          <div>
            <span className="section-label">OUR COLLECTION</span>
            <h2>{showHero ? "Featured Products" : "All Products"}</h2>
          </div>

          <span className="result-count">
            {filteredProducts.length} products
          </span>
        </div>

        <div className="search-box">
          <Search size={19} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="no-products">
              No products found. Try another search.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
