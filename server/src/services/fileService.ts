import { insertManyCsvLines } from "../repositories/CsvLineMongoDbRepository"
import { CsvLineDTO } from "../models/CsvLine"
import { Readable } from "stream"
import readline from "readline"
import { createLineObject, sleep } from "../utils/utils"
import { v4 as uuidv4 } from "uuid"

export const insertFilesLinesIntoDb = async (file: Express.Multer.File) => {
	const { buffer } = file
	const readableObject = new Readable()
	readableObject.push(buffer)
	readableObject.push(null)

	const usersLines = readline.createInterface({ input: readableObject })
	const iterator = usersLines[Symbol.asyncIterator]()
	// skip the header line
	await iterator.next()

	const unformattedLinesIndex: number[] = []

	let linesIds = 0
	let currentLine = 1
	let batchesToInsert = 0
	let insertedBatches = 0
	let insertedDocuments = 0

	const linesArray: CsvLineDTO[] = []
	const fileId = uuidv4()

	for await (const line of iterator) {
		const lineObject = createLineObject(line, linesIds, fileId)
		if (!lineObject) {
			unformattedLinesIndex.push(currentLine)
		} else {
			linesIds++
			linesArray.push(lineObject)
			if (linesArray.length === 1000) {
				batchesToInsert++
				insertManyCsvLines([...linesArray]).then((result) => {
					insertedBatches++
					insertedDocuments += result
				})
				linesArray.length = 0
			}
		}
		currentLine++
	}

	if (linesArray.length) {
		batchesToInsert++
		insertManyCsvLines(linesArray).then((result) => {
			insertedBatches++
			insertedDocuments += result
		})
	}

	while (insertedBatches < batchesToInsert) {
		await sleep(20)
	}

	return {
		wronglyFormattedLinesIndex: unformattedLinesIndex.toString(),
		successfullyInsertedLinesQuantity: insertedDocuments,
		fileId: fileId,
	}
}
