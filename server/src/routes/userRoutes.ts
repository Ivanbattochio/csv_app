import express from "express"
import { get } from "../controllers/userController"

const userRouter = express.Router()

userRouter.get("/users", (req, res) => {})

export default userRouter
