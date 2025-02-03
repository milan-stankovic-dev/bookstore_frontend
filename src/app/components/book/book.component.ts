import { Component, ElementRef, input, output, ViewChild } from '@angular/core';
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
  this.book().orderAmount = this.orderAmount;
  this.book().hideOrderButton = true;
  this.outputBook.emit(this.book());
}
}
