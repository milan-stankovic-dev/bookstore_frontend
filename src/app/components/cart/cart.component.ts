import { Component, input } from '@angular/core';
import { BookFull } from '../../domain/book/bookFull';
import { BookComponent } from "../book/book.component";

@Component({
  selector: 'app-cart',
  imports: [BookComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {  
  book = input<BookFull>();
  
}
