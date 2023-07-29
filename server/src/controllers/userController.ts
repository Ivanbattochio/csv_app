import { NextFunction, Request, Response } from "express"
import { getAllLinesFromCsv } from "../repositories/CsvLineMongoDbRepository"

export const get = async (
	req: Request<{}, {}, {}, { fileId: string }>,
	res: Response,
	next: NextFunction
) => {
	const { fileId } = req.query
	try {
		return res.status(200).json(await getAllLinesFromCsv(fileId))
	} catch (error: any) {
		return next(error)
	}
}
