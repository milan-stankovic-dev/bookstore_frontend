import { Component, computed, inject, input } from '@angular/core';
import { BookFull } from '../../domain/book/bookFull';
import { BookComponent } from "../book/book.component";
import { BooksService } from '../../services/books.service';
import { CartService } from '../../services/cart.service';
import { OrderSave } from '../../domain/order/orderSave';
import { catchError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

    alert(`ORDER: ${JSON.stringify(orderSave)}`)
    this.service.saveOrder(orderSave, token).subscribe({
      next: () => alert('Order placed successfully!'),
      error: (error) => alert(JSON.stringify(error)),
    });
    this.orderedBooks = [];
  }

  orderedBooks : Array<BookFull>;
  service: CartService = inject(CartService);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

    constructor() {
      this.orderedBooks = [];
      this.service.cart$.subscribe(books => {
        this.orderedBooks =  books;
      });
    }
}
