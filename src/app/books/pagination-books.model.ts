import { Book } from "./books.model";

export interface PaginationBooks {
  pageSize: number;
  page: number;
  sort: string;
  sortDirection: string;
  pagesQuantity: number;
  items: Book[];
  filterValue: {};
  totalRows: number;
}
