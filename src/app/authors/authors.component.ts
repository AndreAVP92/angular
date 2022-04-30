import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Author } from './author.model';
import { AuthorsServices } from './authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit, OnDestroy {
  showColumns = ['name', 'lastName', 'profession'];
  dataSource = new MatTableDataSource<Author>();
  private authorSubscription!: Subscription;

  constructor(private authorsService: AuthorsServices) { }

  ngOnInit(): void {
    this.authorsService.getAuthors();
    this.authorSubscription = this.authorsService.getActualListener()
                                                  .subscribe((author: Author[])=> {
                                                    this.dataSource.data = author;
                                                  });
  }

  ngOnDestroy(): void {
    this.authorSubscription.unsubscribe();
  }
}
