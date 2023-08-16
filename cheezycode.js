const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
// const users = require("./data");
const userRouter = require("./routes/userroutes");
const notesRouter = require("./routes/notesrouter");
const mongoose = require("mongoose");
app.use(express.json());
const dotenv = require('dotenv')
const path = require("path")

dotenv.config();
const cors = require('cors')
app.use(cors());


mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then(() => {
    console.log("mongodb connected");
    app.listen(port, () => {
      console.log(`server start on ${port} port`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"test.html"))
});
app.use("/users", userRouter);
app.use("/notes", notesRouter);

