import { Component, input } from '@angular/core';
import { BookFull } from '../../domain/book/bookFull';
// import { BookFull } from '../../domain/book';

@Component({
  selector: 'app-book',
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  book = input.required<BookFull>()
}
