import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Books } from './books.model';
import { BooksService } from './books.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { BookNewComponent } from './book-new.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {

  books: Books[] = [];
  showColumns = ["title", "description", "author", "price"];
  dataSource = new MatTableDataSource<Books>();

  @ViewChild(MatSort) ordering!: MatSort;
  @ViewChild(MatPaginator) pagination!: MatPaginator;

  private bookSubscription!: Subscription;

  constructor(private booksService: BooksService, private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordering;
    this.dataSource.paginator = this.pagination;
  }

  ngOnInit(): void {
    this.dataSource.data = this.booksService.getBooks();
    this.bookSubscription = this.booksService.bookSubject.subscribe(() =>{
      this.dataSource.data = this.booksService.getBooks();
    });
  }

  filter(data: string){
    this.dataSource.filter = data;
  }

  openDialog() {
    this.dialog.open(BookNewComponent, {
      width: '350px'
    });
  }

  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe();
  }
}
