import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookFull } from '../domain/book/bookFull';
import { OrderSave } from '../domain/order/orderSave';
import { HttpClient } from '@angular/common/http';
import { OrderFull } from '../domain/order/orderFull';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private readonly BOOK_DATA = 'bookCartData';
  private readonly CART_URL = 'http://localhost:8080/order';

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

  public saveOrder(order: OrderSave) : Observable<OrderFull> {
      return this.http.post<OrderFull>(this.CART_URL,order);
  }

  constructor() { }
}
