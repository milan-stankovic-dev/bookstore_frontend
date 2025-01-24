import { Book } from "./book"

export type Author = {
    id: number,
    name: string,
    lastName: string,
    books: Array<Book>
}