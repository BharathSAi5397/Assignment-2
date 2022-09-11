const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const postRoutes = require("./routes/postroutes");
const reqAuth=require("./middleware/authmiddleware")
const app = express();
mongoose.connect('mongodb://localhost/assignment');


app.use(bodyParser())
//middleware
app.use("/posts",reqAuth )

app.get("/", (req, res) => {
    res.send("ok");
})

app.use(postRoutes)

app.listen(3000, () => {
    console.log("listening on the port 3000")
})