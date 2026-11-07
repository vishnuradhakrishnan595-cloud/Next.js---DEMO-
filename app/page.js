
import Shop from "@/components/Shop";

export const metadata = {
  title: "All Products | ShopNest",
  description: "Explore the ShopNest product collection."
};

export default function ProductsPage() {
  return <Shop showHero={false} />;
}
