import { BookFull } from "../book/bookFull"

export type OrderSave = {
    books: Array<BookFull>,
    date: Date
}