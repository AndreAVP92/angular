import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatOption } from "@angular/material/core";
import { MatDatepicker } from "@angular/material/datepicker";
import { MatDialog } from "@angular/material/dialog";
import { MatSelectChange } from "@angular/material/select";
import { Subscription } from "rxjs";
import { Author } from "../authors/author.model";
import { AuthorsServices } from "../authors/authors.service";
import { BooksService } from "./books.service";


@Component({
  selector: 'app-book-new',
  templateUrl: 'book-new.component.html'
})

export class BookNewComponent implements OnInit, OnDestroy{
  selectAuthor!: string;
  selectAuthorText!: string;
  publishDate!: string;
  @ViewChild(MatDatepicker) picker!: MatDatepicker<Date>;

  authors: Author[] = [];

  authorSubscription!: Subscription;

  constructor(private booksService: BooksService,
              private authorsService: AuthorsServices,
              private dialogRef: MatDialog){}

  ngOnInit(): void {
    this.authorsService.getAuthors();
    this.authorSubscription = this.authorsService.getActualListener()
      .subscribe((authors: Author[]) => {
        this.authors = authors;
      });
  }

  selected(event: MatSelectChange) {
    this.selectAuthorText = (event.source.selected as MatOption).viewValue;
  }

  saveBook(form: NgForm) {
    if(form.valid) {
      const authorRequest = {
        id: this.selectAuthor,
        fullName: this.selectAuthorText
      };

      const bookRequest = {
        id: null,
        description: form.value.description,
        title: form.value.title,
        author: authorRequest,
        price: parseInt(form.value.price),
        publishDate: new Date(this.publishDate)
      };

      this.booksService.saveBook(bookRequest);
      this.authorSubscription = this.booksService.saveBookListener()
        .subscribe( () => {
          this.dialogRef.closeAll();
        });
    }
  }

  ngOnDestroy(): void {
    this.authorSubscription.unsubscribe();
  }
}
