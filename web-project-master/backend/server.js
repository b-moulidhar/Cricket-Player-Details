import express from "express"
import cors from "cors"
import players from "./api/cricket_player.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/players", players)
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

export default app