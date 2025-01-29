import { Component } from '@angular/core';
import { BookFull } from '../../domain/book/bookFull';
// import { BookFull } from '../../domain/book';

@Component({
  selector: 'app-book',
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  book: BookFull = { 
    id: 1,
    title: 'naslov knjige',
    price: 40.0,
    isbn: '43534A',
    imageUrl: undefined,
    author: {
      id: 1,
      name: "Pera",
      lastName: "Peric"
    },
    category : {
      id: 1,
      name: "category1",
      description: "Description"
    },
    genre: {
      id:1,
      name: "genre1",
      description: "genre Description"
    }
  }
}
