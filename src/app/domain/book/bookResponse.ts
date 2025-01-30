import { BookFull } from "./bookFull"

export type BookResponse = {
    books: Array<BookFull>,
    numOfPages: number
}