import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Author } from './author.model';
import { AuthorsServices } from './authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  showColumns = ['name', 'lastName', 'profession'];
  dataSource = new MatTableDataSource<Author>();

  constructor(private authorsService: AuthorsServices) { }

  ngOnInit(): void {
    this.authorsService.getAuthors();
    this.authorsService.getActualListener()
    .subscribe((author: Author[])=> {
      this.dataSource.data = author;
    });

  }

}
