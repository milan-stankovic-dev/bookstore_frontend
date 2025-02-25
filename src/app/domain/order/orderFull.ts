import { BookFull } from "../book/bookFull"
import { OrderItemFull } from "../orderItem/orderItemFull"

export type OrderFull = {
    id: number,
    userId: number,
    date: Date,
    items: OrderItemFull[]
}