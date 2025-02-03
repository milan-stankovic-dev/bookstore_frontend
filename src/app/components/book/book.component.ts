import { Component, ElementRef, input, output, ViewChild } from '@angular/core';
import { BookFull } from '../../domain/book/bookFull';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-book',
  imports: [FormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
@ViewChild('orderDialog') orderDialog!: ElementRef;
outputBook = output<BookFull>();

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

  this.addBookToSessionStorage(bookOrderData);

  console.log('Saved book: ', JSON.stringify(bookOrderData), 
    " In local storage.");
}

 addBookToSessionStorage(aBook: BookFull) {
    const BOOK_DATA : string = 'bookCartData';

    let booksFromCartString : string | null =
     sessionStorage.getItem(BOOK_DATA);
    let booksFromCart : Array<BookFull> = 
      booksFromCartString === null ? [] : 
      JSON.parse(booksFromCartString); 

    console.log('Adding book to session storage. Current storage: ',
      booksFromCart);

    if(booksFromCart.length === 0) {
      sessionStorage.setItem(BOOK_DATA, 
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

    sessionStorage.setItem(BOOK_DATA, 
      JSON.stringify(booksFromCart));
 }
}
