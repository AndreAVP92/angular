import { Book } from './books.model';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaginationBooks } from './pagination-books.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  baseUrl = environment.baseUrl;
  bookSubject = new Subject<Book>();

  bookPagination!: PaginationBooks;
  bookPaginationSubject = new Subject<PaginationBooks>();

  constructor(private http: HttpClient) { }

  getBooks(bookPerPage: number, currentPage: number, sort: string, sortDirection: string, filterValue: any): void {
    const request = {
      pageSize: bookPerPage,
      page: currentPage,
      sort: sort,
      sortDirection: sortDirection,
      filterValue: filterValue
    };
    this.http.post<PaginationBooks>(this.baseUrl + 'book/pagination', request)
        .subscribe((response) => {
          this.bookPagination = response;
          this.bookPaginationSubject.next(this.bookPagination);
        })
  }

  getActualListener(): any {
    /* el bookPaginationSubject tiene la data que viene del servidor */
    return this.bookPaginationSubject.asObservable();
  }

  saveBook(book: Book): void {
    this.http.post(this.baseUrl + 'book', book)
      .subscribe((response) => {
        this.bookSubject.next(book);
      });
  }

  saveBookListener(): any{
    return this.bookSubject.asObservable();
  }
}
