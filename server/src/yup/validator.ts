import { Request, Response, NextFunction } from "express"
import { AnyObjectSchema } from "yup"

export const validate =
	(schema: AnyObjectSchema) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validate({
				body: req.body,
				query: req.query,
				params: req.params,
			})
			return next()
		} catch (err: any) {
			return res
				.status(500)
				.json({ type: err.name, message: err.message })
		}
	}
