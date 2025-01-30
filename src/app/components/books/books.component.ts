import { Component, inject, OnInit } from '@angular/core';
import { BookFull } from '../../domain/book/bookFull';
import { BooksService } from '../../services/books.service';
import { error } from 'console';
import { catchError } from 'rxjs';
import { BookComponent } from "../book/book.component";
import { PagingButtonsComponent } from "../paging-buttons/paging-buttons.component";

@Component({
  selector: 'app-books',
  imports: [BookComponent, PagingButtonsComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit{

onPageSelected($event: number) {
  this.service.getAllBooks($event - 1, 2)
  .pipe(catchError(err=> {console.log(err); throw err}))
  .subscribe(response => {
    this.booksFromAPI = response.books;
  });
}

  booksFromAPI : Array<BookFull> = []
  numOfPages: number = 0
  service = inject(BooksService)
  // selectedPage = signal
  pageToCall = 0

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.service.getAllBooks(0,2)
    .pipe(
      catchError(err => {
        console.log(err);
        throw err;
      })).subscribe(response => {
        this.booksFromAPI = response.books
        this.numOfPages = response.numOfPages
      })
  }

}
