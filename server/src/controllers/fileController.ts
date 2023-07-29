import { NextFunction, Request, Response } from "express"
import { insertFilesLinesIntoDb } from "../services/fileService"

export const post = async (
	req: Request<{}, {}, {}>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { file } = req

		return res.status(202).json(await insertFilesLinesIntoDb(file!))
	} catch (error: any) {
		return next(error)
	}
}
