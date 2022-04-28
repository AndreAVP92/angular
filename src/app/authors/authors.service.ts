import { Injectable } from "@angular/core";
import { Author } from "./author.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorsServices {
  baseUrl = environment.baseUrl;
  private authorsList: Author[] = [];
  private authorsSubject = new Subject<Author[]>();

  constructor(private http: HttpClient){}

  getAuthors(){
    this.http.get<Author[]>(this.baseUrl + 'api/Author/authors')
    .subscribe((data) => {
      this.authorsList = data;
      this.authorsSubject.next([...this.authorsList]);
    });
  }

  getActualListener(){
    return this.authorsSubject.asObservable();
  }

}
