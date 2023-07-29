export type CsvLine = {
    name: string
    city: string
    country: string
    favorite_sport: string
    fileId: string
    id: number
}

export type PostFileResponse = {
    wronglyFormattedLinesIndex: string
    successfullyInsertedLinesQuantity: number
    fileId: string
}

export type File = {
    name: string
    _id: string
}
