import { object, string } from "yup"

export const UserParamsSchema = object({
	query: object({
		fileId: string().required(),
	}),
})
