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
  orderedBookJSON : string | null;
  orderedBook : BookFull | null;
  
    constructor() {
      this.orderedBookJSON = sessionStorage.getItem('orderedBook');
      
      this,this.orderedBook = this.orderedBookJSON === null ? null :
      JSON.parse(this.orderedBookJSON);
    }
}
