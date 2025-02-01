import { Component, input } from '@angular/core';
import { BookFull } from '../../domain/book/bookFull';
// import { BookFull } from '../../domain/book';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-book',
  imports: [FormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {

logValue() {
 console.log("VALUE: ", this.orderAmount)
}
  book = input.required<BookFull>();
  orderAmount : number = 0

orderAttempt() {
  
}

}
