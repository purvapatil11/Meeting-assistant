const express = require("express")
const cors = require("cors")
require("dotenv").config()
const tokenRoutes = require("./routes/token")
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/token", tokenRoutes)
app.get("/",(req,res) => {
    res.send("Backend running")
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})