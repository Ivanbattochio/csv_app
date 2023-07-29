import { NextFunction, Request, Response } from "express"
import { insertFilesLinesIntoDb } from "../services/fileService"
import { insertFile } from "../repositories/fileMongoDbRepository"

export const post = async (
	req: Request<{}, {}, {}>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { file } = req

		const insertedFile = await insertFile({ name: file!.originalname })

		return res
			.status(202)
			.json(await insertFilesLinesIntoDb(file!, insertedFile._id))
	} catch (error: any) {
		return next(error)
	}
}
