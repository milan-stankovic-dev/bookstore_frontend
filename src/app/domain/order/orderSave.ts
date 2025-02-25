import { BookFull } from "../book/bookFull"
import { OrderItemSave } from "../orderItem/orderItemSave"

export type OrderSave = {
    userId: number,
    items: OrderItemSave[],
    date: Date
}