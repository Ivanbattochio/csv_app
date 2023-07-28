import express from "express"
import { get } from "../controllers/userController"

const userRouter = express.Router()

userRouter.get("/users", get)

export default userRouter
