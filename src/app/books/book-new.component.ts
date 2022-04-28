import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatOption } from "@angular/material/core";
import { MatDatepicker } from "@angular/material/datepicker";
import { MatDialog } from "@angular/material/dialog";
import { MatSelectChange } from "@angular/material/select";
import { Author } from "../authors/author.model";
import { AuthorsServices } from "../authors/authors.service";
import { BooksService } from "./books.service";


@Component({
  selector: 'app-book-new',
  templateUrl: 'book-new.component.html'
})

export class BookNewComponent implements OnInit{
  selectAuthor!: string;
  selectAuthorText!: string;
  datePublished!: string;
  @ViewChild(MatDatepicker) picker!: MatDatepicker<Date>;
  authors: Author[] = [];

  constructor(private booksService: BooksService,
              private authorsService: AuthorsServices,
              private dialogRef: MatDialog){}

  ngOnInit(): void {
      // this.authors = this.authorsService.getAuthors();
  }

  selected(event: MatSelectChange) {
    this.selectAuthorText = (event.source.selected as MatOption).viewValue;
  }

  saveBook(form: NgForm) {
    if(form.valid) {
      this.booksService.saveBook({
        bookId: 1,
        description: form.value.description,
        title: form.value.title,
        author: this.selectAuthorText,
        price: form.value.price,
        datePublished: new Date(this.datePublished)
      });
      this.dialogRef.closeAll();
    }
  }
}
