import express from "express"
import { post } from "../controllers/fileController"
import { validate } from "../yup/validator"
import { CsvLineSchema } from "../yup/CsvLineSchema"

const fileRouter = express.Router()

fileRouter.post("/files", validate(CsvLineSchema), post)

export default fileRouter
