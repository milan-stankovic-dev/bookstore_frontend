import { inject, Inject, Injectable, input, Signal, signal } from '@angular/core';
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

  private orderedBook = signal<BookFull | undefined>(undefined);

  setBook(book: BookFull) {
    this.orderedBook.set(book);
    console.log("Ordered book set in service: ", JSON.stringify(book));
  }

  getBook() : Signal<BookFull | undefined> {
    console.log("Gettnig book. Book:", this.orderedBook());
    return this.orderedBook;
  }

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
