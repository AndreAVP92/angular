import { Subject } from "rxjs";

export class BookService {

  subject = new Subject();

  private books = ['Libro 1', 'Libro 2', 'Libro 3', 'Libro 4'];

  getBooks() {
    return [...this.books]; ///los 3 puntos suspensivos sirven no solamente para mostrar los elementos existentes
    ///si no los nuevos que se vayan agregando.
  }

  addBook(bookName: string) {
    this.books.push(bookName);
    this.subject.next(true);
  }
}
