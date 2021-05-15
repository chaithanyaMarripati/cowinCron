import axios, { AxiosRequestConfig } from "axios";
import dotenv from "dotenv";
dotenv.config();
export const sendMessage = async (chatId: number, text: string): Promise<void> => {
    try {
        const data = {
            chat_id: chatId,
            text: text
        }
        const req = {
            url: `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
            method: "POST",
            data: data
        } as AxiosRequestConfig;
        await axios(req);
    } catch (error) {
       
    }
}