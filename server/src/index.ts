import express from "express"
import cors from "cors"
import "dotenv/config"
import { mongodbConnect } from "./config/database"
import fileRouter from "./routes/fileRoutes"
import userRouter from "./routes/userRoutes"
import { startCsvLinesCollection } from "./repositories/CsvLineMongoDbRepository"

const main = () => {
	mongodbConnect()
		.then(() => {
			let port = process.env.PORT
			startCsvLinesCollection()
			let app = express()

			app.use(
				cors({
					origin: "*",
				})
			)
			app.use(express.json())

			app.use("/api", fileRouter)
			app.use("/api", userRouter)

			app.listen(port, () => {
				console.log("listening on port", port)
			})
		})
		.catch((err) => {
			console.log("something went wrong when connecting to db", err)
		})
}

main()
