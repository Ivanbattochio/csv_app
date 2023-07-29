import express from "express"
import { get, post } from "../controllers/fileController"
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

fileRouter.get("/files", get)

export default fileRouter
