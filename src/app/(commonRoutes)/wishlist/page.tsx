import FeatureSection from "@/container/home_page/subBannerSlider/subBannerSlider";
import ProductList from "@/container/wishlist_page/productList";

const WishlistPage = () => {
  return (
    <div className="max-content-width section-padding-x section-content-top">
      <ProductList />
      <section className="section-padding-y">
        <FeatureSection />
      </section>
    </div>
  );
};

export default WishlistPage;
