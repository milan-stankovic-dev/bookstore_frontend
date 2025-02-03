import { BookAuthorDisplay } from "../book/bookAuthorDisplay"

export type AuthorFull = {
    id: number,
    name: string,
    lastName: string,
    books: Array<BookAuthorDisplay>
}