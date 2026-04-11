"use client";
import FeatureSection from '@/container/shop_page/featureSection/featureSection';
import ShopingProductMain from '@/container/shop_page/shopingProduct/shopingProductMain';

const shopPage = () => {
    return (
        <main className='section-padding-t mt-28'>
            <ShopingProductMain />
            <section className='section-padding-x section-padding-b section-padding-t'>
                <FeatureSection />
            </section>
        </main>
    );
};

export default shopPage;