import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookFull } from '../domain/book/bookFull';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private readonly BOOK_DATA = 'bookCartData';

  private cartSubject = new BehaviorSubject<Array<BookFull>>(this.getCurrentSessionStorage());
  cart$ = this.cartSubject.asObservable();

  private getCurrentSessionStorage() : Array<BookFull> {
    const booksFromCartString = sessionStorage.getItem(this.BOOK_DATA);

    return booksFromCartString ? JSON.parse(booksFromCartString) : [];
  }

  removeFromCart(id: number) {
    let booksFromCart = this.getCurrentSessionStorage()
      .filter(book => book.id !== id);
    this.updateSessionStorage(booksFromCart);
  }

  addBookToCart(bookOrderData: BookFull) {
    let booksFromCart = this.getCurrentSessionStorage();

    const existingBook = booksFromCart.find(book=> book.id === bookOrderData.id);

    if(existingBook) {
      existingBook.orderAmount = (existingBook.orderAmount || 0 ) +
      (bookOrderData.orderAmount || 0);
    } else {
      booksFromCart.push(bookOrderData);
    }

    this.updateSessionStorage(booksFromCart);
  }

  private updateSessionStorage(books: Array<BookFull>) {
    sessionStorage.setItem(this.BOOK_DATA, JSON.stringify(books));
    this.cartSubject.next(books);
  }

  constructor() { }
}
