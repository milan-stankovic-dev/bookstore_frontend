import { BookFull } from "../book/bookFull"

export type OrderFull = {
    id: number,
    books: Array<BookFull>,
    date: Date
}