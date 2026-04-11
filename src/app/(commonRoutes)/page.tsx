import AllProductMainSection from "@/container/home_page/allProductsSection/allProductMainSection";
import Banner from "@/container/home_page/banner/banner";
import BrandsCarousel from "@/container/home_page/brands/brandsCarousel";
import DailyBestSells from "@/container/home_page/dailyBestSells/dailyBestSells";
import DiscountBanner from "@/container/home_page/discountBanner/discountBanner";
import OfferSection from "@/container/home_page/fastOrderOffer/offerSection";
import { FeatureCategory } from "@/container/home_page/featureCategory/featureCategory";
import FlashSaleCounter from "@/container/home_page/flashSaleCounter/flashSaleCounter";
import { FlashSaleSliderMain } from "@/container/home_page/flashSaleSliderMain/flashSaleSliderMain";
import { HotDealsToday } from "@/container/home_page/hotDealsToday/hotDealsToday";
import NewsletterSection from "@/container/home_page/newsletterSection/newsletterSection";
import ProductSection from "@/container/home_page/productCard/productSection";
import SubBannerSlider from "@/container/home_page/subBannerSlider/subBannerSlider";
const Homepage = () => {
  return (
    <div className="max-content-width">
      <section className="section-content-top ">
        <Banner />
      </section>
      <section className="section-padding-t section-padding-x">
        <SubBannerSlider />
      </section>
      <section className="section-padding-t section-padding-x">
        <FeatureCategory />
      </section>
      <section className="section-padding-t section-padding-x">
        <FlashSaleSliderMain />
      </section>
      <section className="section-padding-t section-padding-x">
        <FlashSaleCounter />
      </section>
      <section className="section-padding-t section-padding-x">
        <ProductSection />
      </section>
      <section className="section-padding-t section-padding-x">
        <OfferSection />
      </section>
      <section className="section-padding-t section-padding-x">
        <HotDealsToday />
      </section>
      <section className="section-padding-t section-padding-x">
        <DiscountBanner />
      </section>
      <section className="section-padding-t section-padding-x">
        <AllProductMainSection />
      </section>
      <section className="section-padding-t section-padding-x">
        <BrandsCarousel />
      </section>
      <section className="section-padding-t section-padding-x">
        <DailyBestSells />
      </section>
      <section className="section-padding-t py-20 section-padding-x">
        <NewsletterSection />
      </section>
    </div>
  );
};

export default Homepage;
