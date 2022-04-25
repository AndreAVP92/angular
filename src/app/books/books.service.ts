import { Books } from './books.model';

export class BooksService {

  private bookList: Books[] = [
    { bookId: 1, title:'Algoritmos', description: 'libro básico 1', author: 'Vaxi Dreza', price: 18 },
    { bookId: 2, title:'Angular', description: 'libro básico 2', author: 'Vaxi Drezb', price: 19 },
    { bookId: 3, title:'ASP .NET', description: 'libro básico 3', author: 'Vaxi Drezx', price: 20 },
    { bookId: 4, title:'Java', description: 'libro básico 4', author: 'Vaxi Drezd', price: 21 }
  ];

  getBooks() {
    return this.bookList.slice();
  }
}
