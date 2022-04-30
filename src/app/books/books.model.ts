export interface Book {
  id: string | null; // type-guard
  title: string;
  description: string;
  price: number;
  publishDate?: Date;
  author: {
    id: string,
    fullName: string
  };
}
