import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookFull } from '../domain/book/bookFull';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private readonly BOOKS_URL = 'http://localhost:8080/book'
  http = inject(HttpClient)

  constructor() { }

  public getAllBooks(): Observable<Array<BookFull>> {
      return this.http.get<BookFull[]>(this.BOOKS_URL);
  }
}
