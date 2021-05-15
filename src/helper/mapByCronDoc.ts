import { cronDoc } from "../interface"

export const mapByCronDoc = (doc:any):cronDoc => {
    return {
        chatId: doc.chatId,
        pinCode: doc.pinCode,
        _id:doc._id
    } as cronDoc;
}