import { mixed, object } from "yup"

export const FileSchema = object().shape({
	file: mixed().required("File is required"),
})
