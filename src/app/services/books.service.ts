import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookFull } from '../domain/book/bookFull';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BookResponse } from '../domain/book/bookResponse';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private readonly BOOKS_URL = 'http://localhost:8080/book'
  http = inject(HttpClient)

  constructor() { }

  public getAllBooks(page? : number, size? : number ): Observable<BookResponse> {
    let params = new HttpParams();
    
    if(page) {
      params = params.set('page', page.toString());
    }

    if(size) {
      params = params.set('size', size.toString());
    }
    
    return this.http.get<BookResponse>(this.BOOKS_URL, { params });
  }
}
