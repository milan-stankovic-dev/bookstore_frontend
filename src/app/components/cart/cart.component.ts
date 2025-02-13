import { Component, computed, inject, input } from '@angular/core';
import { BookFull } from '../../domain/book/bookFull';
import { BookComponent } from "../book/book.component";
import { BooksService } from '../../services/books.service';
import { CartService } from '../../services/cart.service';
import { OrderSave } from '../../domain/order/orderSave';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [BookComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  attemptOrder() {
  // throw new Error('Method not implemented.');
    // console.log('Order attempted. Ordered books: ', this.orderedBooks);
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const orderedBooks = this.orderedBooks;

    const orderSave : OrderSave = {
      books : orderedBooks,
      date: now
    };

    this.service.saveOrder(orderSave).subscribe({
      next: () => alert('Order placed successfully!'),
      error: (error) => alert(JSON.stringify(error)),
    });
    this.orderedBooks = [];
  }

  orderedBooks : Array<BookFull>;
  service: CartService = inject(CartService);

    constructor() {
      this.orderedBooks = [];
      this.service.cart$.subscribe(books => {
        this.orderedBooks =  books;
      });
    }
}
