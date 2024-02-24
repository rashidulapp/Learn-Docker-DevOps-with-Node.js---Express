const express = require("express")

const app = express()

const port = process.env.PORT || 100


app.get("/", (req, res) => {
    res.send("Hello, World! with development")
})


app.listen(port, () => {console.log(`server listening on port ${port}`)})