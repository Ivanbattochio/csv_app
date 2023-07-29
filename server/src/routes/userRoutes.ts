import express from "express"
import { get } from "../controllers/userController"
import { validate } from "../yup/validator"
import { UserParamsSchema } from "../yup/UserParamsSchema"

const userRouter = express.Router()

userRouter.get("/users", validate(UserParamsSchema), get)

export default userRouter
