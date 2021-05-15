//roadmap
//first get the chatid and the pincode from the database
//for each pincode make the getBypin usecase,
//if vaccine is availabe then message using the chat id vaccine related info
import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";
import cron from "node-cron";
import { getAlldocs } from "./src/entities/dbQueries";
import { mapByCronDoc } from "./src/helper/mapByCronDoc";
import { cronByPinUseCase } from "./src/useCases";
import { adminChatId } from "./src/config";
import { sendMessage } from "./src/entities/sendMessage";

cron.schedule("*/5 * * * *", async () => {
  try {
    //1) first get the chat id and pincode from the database
    const result = await getAlldocs();
    result.forEach(async item => {
      //for each pincode and chatid pair call getBypinUseCase
      const cronDoc = mapByCronDoc(item);
      const result = await cronByPinUseCase(cronDoc.pinCode);
      console.log(cronDoc);
      if (result) {
        await sendMessage(cronDoc.chatId,`please find the vaccine related info\n${result}`);
      }
    })
  } catch (error) {
    console.error("fatal error" + error);
    await sendMessage(adminChatId, "fatal cron job error " + error);
  }
});

export const client = new MongoClient(process.env.MONGO_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
