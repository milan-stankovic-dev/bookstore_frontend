import { Component, ElementRef, inject, input, output, ViewChild } from '@angular/core';
import { BookFull } from '../../domain/book/bookFull';
import {FormsModule} from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { AuthService, RedirectableRoutes } from '../../services/auth.service';

@Component({
  selector: 'app-book',
  imports: [FormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {

readonly BOOK_DATA = 'bookCartData';

@ViewChild('orderDialog') orderDialog!: ElementRef;
outputBook = output<BookFull>();
cartService: CartService = inject(CartService);
authService = inject(AuthService);

logValue() {
 console.log("VALUE: ", this.orderAmount)
}

  book = input.required<BookFull>();
  orderAmount : number = 0

orderAttempt() {
  console.log("Attempted order.", this.orderAmount);
  this.orderDialog.nativeElement.close();

  const bookOrderData : BookFull =
   { ...this.book(), orderAmount: this.orderAmount, 
      hideOrderButton: true};

    this.cartService.addBookToCart(bookOrderData);
}

removeFromCart() {
  this.cartService.removeFromCart(this.book().id);
}

getCurrentSessionStorage() : Array<BookFull> {
  let booksFromCartString : string | null =
  sessionStorage.getItem(this.BOOK_DATA);

  return booksFromCartString === null ? [] : JSON.parse(booksFromCartString);
}

 addBookToSessionStorage(aBook: BookFull) {
    let booksFromCart : Array<BookFull> = 
      this.getCurrentSessionStorage();

    console.log('Adding book to session storage. Current storage: ',
      booksFromCart);

    if(booksFromCart.length === 0) {
      sessionStorage.setItem(this.BOOK_DATA, 
        JSON.stringify([aBook]));
        return;
    }

    let existingBook = booksFromCart.find(book => book.id === aBook.id);

    if(existingBook) {
      existingBook.orderAmount 
      = (existingBook.orderAmount || 0) +
       (aBook.orderAmount || 0);
    } else {
      booksFromCart.push(aBook);
    }

    sessionStorage.setItem(this.BOOK_DATA, 
      JSON.stringify(booksFromCart));
 }

 isUserLoggedIn() : Boolean {
    return this.authService.isUserLoggedIn();
  }

  redirectToLogin() {
    // throw new Error('Method not implemented.');
    this.authService.navigateTo(RedirectableRoutes.LOGIN, 2000);
  }
    
}
