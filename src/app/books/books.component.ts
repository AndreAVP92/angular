import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Book } from './books.model';
import { BooksService } from './books.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { BookNewComponent } from './book-new.component';
import { Subscription } from 'rxjs';
import { PaginationBooks } from './pagination-books.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  timeout: any = null;
  bookData: Book[] = [];
  showColumns = ["title", "description", "author.fullName", "price"];
  dataSource = new MatTableDataSource<Book>();

  @ViewChild(MatSort) ordering!: MatSort;
  @ViewChild(MatPaginator) pagination!: MatPaginator;

  private bookSubscription!: Subscription;

  totalBooks = 0;
  booksPerPage = 2;
  comboPage = [1, 2, 5, 10];
  currentPage = 1;
  sort = 'title';
  sortDirection = 'asc';
  filterValue = null;

  constructor(private booksService: BooksService, private dialog: MatDialog) { }

  eventPaginator(event: PageEvent): void{
    this.booksPerPage = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.booksService.getBooks(this.booksPerPage, this.currentPage, this.sort, this.sortDirection, this.filterValue);
  }

  orderColumn(event: any): void{
    this.sort = event.active;
    this.sortDirection = event.direction;
    this.booksService.getBooks(this.booksPerPage, this.currentPage, event.active, event.direction, this.filterValue);
  }

  ngOnInit(): void {
    this.booksService.getBooks(this.booksPerPage, this.currentPage, this.sort, this.sortDirection, this.filterValue);
    this.booksService
        .getActualListener()
        .subscribe((pagination: PaginationBooks) => {
          this.dataSource = new MatTableDataSource<Book>(pagination.items);
          this.totalBooks = pagination.totalRows;
        });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordering;
    this.dataSource.paginator = this.pagination;
  }

  filter(event: any): void{
    clearTimeout(this.timeout);
    const $this = this;
    this.timeout = setTimeout( () => {
      if(event.keyCode != 13){
        const filterValueLocal = {
          property:  'title',
          value: event.target.value
        };
        //$this.filterValue = filterValueLocal;
        $this.booksService.getBooks($this.booksPerPage, $this.currentPage, $this.sort, $this.sortDirection, filterValueLocal);
      }
    }, 1000)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BookNewComponent, {
      width: '450px'
    });

    dialogRef.afterClosed()
      .subscribe( () => {
        this.booksService.getBooks(this.booksPerPage, this.currentPage, this.sort, this.sortDirection, this.filterValue);
      });
  }

  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe();
  }
}
