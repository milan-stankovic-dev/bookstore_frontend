import { Component, inject, OnInit } from '@angular/core';
import { BookFull } from '../../domain/book/bookFull';
import { BooksService } from '../../services/books.service';
import { error } from 'console';
import { catchError } from 'rxjs';
import { BookComponent } from "../book/book.component";

@Component({
  selector: 'app-books',
  imports: [BookComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit{
  booksFromAPI : Array<BookFull> = []
  service = inject(BooksService)

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.service.getAllBooks()
    .pipe(
      catchError(err => {
        console.log(err);
        throw err;
      })).subscribe(response => {
        this.booksFromAPI = response
      })
  }

}
