import { Component, computed, inject, input } from '@angular/core';
import { BookFull } from '../../domain/book/bookFull';
import { BookComponent } from "../book/book.component";
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-cart',
  imports: [BookComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  orderedBooks : Array<BookFull>;
  
    constructor() {
      const orderedBooksJSON = sessionStorage.getItem('bookCartData');
      
      this.orderedBooks = orderedBooksJSON === null ? [] :
      JSON.parse(orderedBooksJSON);

      console.log("Cart component. Books: ", this.orderedBooks);
    }
}
