export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const createLineObject = (
	string: string,
	id: number,
	fileId: string
) => {
	const fields = string.split(",")

	if (fields.length != 4) return null

	const [name, city, country, favorite_sport] = fields

	return {
		name,
		city,
		country,
		favorite_sport,
		fileId,
		id,
	}
}
