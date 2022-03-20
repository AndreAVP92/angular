import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input()
  title!: string;

  @Output()
  bookClicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClicked(){
    this.bookClicked.emit();
  }

}
