import { Collection } from "mongodb"
import { database } from "../config/database"
import { File, FileDTO } from "../models/File"

export const fileRepository = {}

let collection: Collection

export const startFileCollection = () => {
	collection = database.collection("files")
}

export const insertFile: (file: File) => Promise<FileDTO> = async (file) => {
	try {
		await collection.insertOne(file)
		return file
	} catch (error: any) {
		return error
	}
}
