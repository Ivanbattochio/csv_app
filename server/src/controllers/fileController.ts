import { NextFunction, Request, Response } from "express"
import { insertCsvLine } from "../repositories/CsvLineMongoDbRepository"
import { CsvLineDTO } from "../models/CsvLine"

export const post = async (
	req: Request<{}, {}, CsvLineDTO>,
	res: Response,
	next: NextFunction
) => {
	const csvLine = req.body
	try {
		const result = await insertCsvLine(csvLine)

		return res.status(200).json(result)
	} catch (error: any) {
		return next(error)
	}
}
