export interface IProduct {
  _id: string;
  name: string;
  image: string;
  badge: {
    text: string;
    color: string;
  };
  seller: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
}
