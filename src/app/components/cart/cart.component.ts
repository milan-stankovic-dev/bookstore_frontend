import { Component, computed, inject, input } from '@angular/core';
import { BookFull } from '../../domain/book/bookFull';
import { BookComponent } from "../book/book.component";
import { BooksService } from '../../services/books.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [BookComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  orderedBooks : Array<BookFull>;
  service: CartService = inject(CartService);

    constructor() {
      this.orderedBooks = [];
      this.service.cart$.subscribe(books => {
        this.orderedBooks =  books;
      });
    }
}
