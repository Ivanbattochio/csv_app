import { Db, MongoClient } from "mongodb"
import "dotenv/config"
export let database: Db

export const mongodbConnect = async () => {
	let uri = `mongodb+srv://csvapp:${process.env.MONGODB_PASSWORD}@csvapp.cc1mgnx.mongodb.net/?retryWrites=true&w=majority`
	let client = new MongoClient(uri)
	await client.connect()
	database = client.db("csvapp")
}
