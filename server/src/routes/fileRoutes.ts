import express from "express"
import { post } from "../controllers/fileController"
import { validate } from "../yup/validator"
import { FileSchema } from "../yup/FileSchema"
import { multerObject } from "../config/multer"

const fileRouter = express.Router()

fileRouter.post(
	"/files",
	multerObject.single("file"),
	validate(FileSchema),
	post
)

export default fileRouter
