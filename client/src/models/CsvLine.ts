export type CsvLine = {
    name: string
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
