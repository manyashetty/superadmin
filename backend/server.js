const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const routes = require("./routes/userRoute");

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.json());

// app.use(cors());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", routes);

// app.get("/ping",(req,res)=>{
//   res.send("pong")
// })


app.listen(port, () => {
  console.log(`server running at ${port}`);
});
