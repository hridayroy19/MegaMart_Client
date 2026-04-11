export interface IBlogPost {
    id: string;
    title: string;
    category: string;
    author: string;
    date: string;
    createdAt: string; // ISO date
    comments: number;
    review: string;
    images: string[];
    description: string;
    marketTitle: string;
    marketList: string[];
    tags: string[];
    excerpt: string;
}
