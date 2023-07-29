import { ObjectId } from "mongodb"

export type FileDTO = {
	name: string
}

export type File = {
	name: string
	_id: ObjectId
}
