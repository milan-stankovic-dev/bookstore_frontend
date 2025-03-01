import { Component, computed, inject, input } from '@angular/core';
import { BookFull } from '../../domain/book/bookFull';
import { BookComponent } from "../book/book.component";
import { BooksService } from '../../services/books.service';
import { CartService } from '../../services/cart.service';
import { OrderSave } from '../../domain/order/orderSave';
import { catchError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-cart',
  imports: [BookComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  attemptOrder() {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const orderedBooks = this.orderedBooks;

    
    const token = this.authService.getToken();
    const userID = this.authService.getUserID();

    if(token === null || userID === null) {
      alert('Please log in to continue!');
      this.router.navigate(['/login']);
      return;
    }

    const orderSave : OrderSave = {
      userId: userID,
      items : orderedBooks.map(item => {
        return {
          bookId: item.id,
          amount: item.orderAmount!
        } 
      }),
      date: now
    };

    console.log("Saving order. Data: ",JSON.stringify(orderSave));

    this.service.saveOrder(orderSave, token).subscribe({
      next: () => alert('Order placed successfully!'),
      error: (error) => this.errorService.displayErrorMessage(error),
    });
    this.orderedBooks = [];
  }

  orderedBooks : Array<BookFull>;
  service: CartService = inject(CartService);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  errorService = inject(ErrorService);

    constructor() {
      this.orderedBooks = [];
      this.service.cart$.subscribe(books => {
        this.orderedBooks =  books;
      });
    }
}
