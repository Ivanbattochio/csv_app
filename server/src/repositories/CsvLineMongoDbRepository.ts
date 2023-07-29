import { Collection } from "mongodb"
import { database } from "../config/database"
import { CsvLine, CsvLineDTO } from "../models/CsvLine"

export const CsvLineRepository = {}

let collection: Collection

export const startCsvLinesCollection = () => {
	collection = database.collection("csv_lines")
}

export const insertCsvLine: (csvLine: CsvLineDTO) => Promise<CsvLine> = async (
	csvLine
) => {
	try {
		await collection.insertOne(csvLine)
		return csvLine
	} catch (error: any) {
		return error
	}
}