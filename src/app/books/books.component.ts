import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Books } from './books.model';
import { BooksService } from './books.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, AfterViewInit {

  books: Books[] = [];
  showColumns = ["title", "description", "author", "price"];
  dataSource = new MatTableDataSource<Books>();

  @ViewChild(MatSort) ordering!: MatSort;
  @ViewChild(MatPaginator) pagination!: MatPaginator;

  constructor(private booksService: BooksService) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordering;
    this.dataSource.paginator = this.pagination;
  }

  ngOnInit(): void {
    this.dataSource.data = this.booksService.getBooks();
  }

  filter(data: string){
    this.dataSource.filter = data;
  }
}
