import { AuthorBookDisplay } from "../author/authorBookDisplay"
import { CategoryFull } from "../category/categoryFull"
import { GenreFull } from "../genre/genreFull"

export type BookFull = {
    id: number,
    title: string,
    price: number,
    isbn: string,
    imageUrl: string | undefined,
    author: AuthorBookDisplay,
    category: CategoryFull,
    genre: GenreFull,
    orderAmount: number | undefined,
    hideOrderButton: boolean
}