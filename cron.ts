//roadmap
//first get the chatid and the pincode from the database
//for each pincode make the getBypin usecase,
//if vaccine is availabe then message using the chat id vaccine related info

import { MongoClient } from "mongodb";
import cron from "node-cron";
import { getAlldocs } from "./src/entities/dbQueries";
import dotenv from "dotenv";
dotenv.config();
cron.schedule("*/5 * * * * *", async () => {
  try {
    //1) first get the chat id and pincode from the database
    const result = await getAlldocs();
    result.forEach(item => {
      console.log(item)
    })
  } catch (error) {
    console.error("fatal error" + error);
  }
});

export const client = new MongoClient(process.env.MONGO_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
