interface Timer {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export interface ISellsProduct {
    _id: string;
    sale: string;
    oldPrice: number;
    newPrice: number;
    rating: number;
    reviews: string;
    title: string;
    seller: string;
    sold: string;
    image: string;
    timer: Timer;
}
