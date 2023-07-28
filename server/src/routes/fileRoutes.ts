import express from "express"
import { post } from "../controllers/fileController"

const fileRouter = express.Router()

fileRouter.post("/files", post)

export default fileRouter
