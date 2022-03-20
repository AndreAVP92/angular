import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/books.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: string[]= [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
    this.bookService.subject.subscribe(() => {
      this.books = this.bookService.getBooks();
    });
  }

  deleteBook(book:any){
    this.books = this.books.filter(x => x !== book);
  }

  saveBook(f:any){
    if(f.valid){
      this.bookService.addBook(f.value.nameBook);
    }
    this.bookService.getBooks();
  }
}
