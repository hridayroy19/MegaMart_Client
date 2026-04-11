import { blogPostHandlers } from "./blgoPost";
import { brandsHandlers } from "./brands";
import { featureCategoryHandlers } from "./featuredCategory";
import { featureProductHandlers } from "./featureProduct";
import { flashSaleHandlers } from "./flashSale";
import { hotDealsTodayHandlers } from "./hotDealsToday";
import { offerCardHandlers } from "./offer";
import { productCardHandlers } from "./productCard";
import { sellProductHandlers } from "./sellProduct";
import { shopingProductsHandlers } from "./shopingProducts";
import { vendorProductsHandlers } from "./vendorProduct";

export const handlers = [
  ...flashSaleHandlers,
  ...productCardHandlers,
  ...featureCategoryHandlers,
  ...hotDealsTodayHandlers,
  ...offerCardHandlers,
  ...featureProductHandlers,
  ...sellProductHandlers,
  ...brandsHandlers,
  ...shopingProductsHandlers,
  ...blogPostHandlers,
  ...vendorProductsHandlers
];
