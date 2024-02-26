const express = require("express");
const mongoose = require("mongoose");
const postRoute = require("./routes/post_routes");
const authRoute = require("./routes/auth_routes")
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");
const app = express();
app.use(express.json())
const mongdb = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const port = process.env.PORT || 100;

app.get("/", (req, res) => {
  res.send("Hello, World! with development");
});

// const connectionWithRetry = () => {
//   mongoose
//     .connect(mongdb)
//     .then(() => console.log("Database connect succesfully"))
//     .catch((e) => {
//       console.log(e);
//       setTimeout(connectionWithRetry, 5000);
//     });
// };

// connectionWithRetry()

mongoose
    .connect(mongdb)
    .then(() => console.log("Database connect succesfully"))
    .catch((e) => console.log(`Error message ${e}`) )



app.use("/api/v1/posts", postRoute);
app.use("/api/v1/users", authRoute)
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
