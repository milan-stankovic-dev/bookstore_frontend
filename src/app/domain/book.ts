import { Author } from "./author"
import { Category } from "./category"
import { Genre } from "./genre"

export type Book = {
    id: number,
    title: string,
    price: number,
    isbn: string,
    author: Author,
    category: Category,
    genre: Genre
}