
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/components/CartContext";

export const metadata = {
  title: "ShopNest | Online Shopping",
  description: "Discover fashion, electronics and everyday essentials."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}

          <footer className="site-footer">
            <Link href="/" className="footer-logo">
              SHOP<span>NEST.</span>
            </Link>
            <p>Your everyday shopping destination.</p>
            <small>© 2026 ShopNest. All rights reserved.</small>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
