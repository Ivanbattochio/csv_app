import express from "express"
import cors from "cors"
import "dotenv/config"

const main = () => {
	let port = process.env.PORT
	let app = express()
	app.use(
		cors({
			origin: "*",
		})
	)
	app.use(express.json())

	app.listen(port, () => {
		console.log("listening on port", port)
	})
}

main()
