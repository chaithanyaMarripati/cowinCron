import { Cursor } from "mongodb";
import { collections, dbName } from "../config";
import { getClient } from "../helper/getClient"

export const getAlldocs = async ():Promise<Cursor<any>> => {
    const client = await getClient();
    const collection = client.db(dbName).collection(collections.cronJobCollection)
    return collection.find({});
}