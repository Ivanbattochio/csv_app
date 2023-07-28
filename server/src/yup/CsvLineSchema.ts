import { object, string } from "yup"

export const CsvLineSchema = object({
	body: object({
		name: string().required(),
		city: string().required(),
		country: string().required(),
		favorite_sport: string().required(),
	}),
})
