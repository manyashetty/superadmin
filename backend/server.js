const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const socketio = require('socket.io');
const routes = require("./routes/userRoute");
dotenv.config();
const port = process.env.PORT;

const app = express();
const server = require('http').Server(app);
const io = socketio(server);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors());
const corsOptions = {
  origin: 'http://localhost:3000',
  // other CORS options if needed
};
app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Make io accessible to the routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/", routes);

// Socket.IO
io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});



// app.get("/ping",(req,res)=>{
//   res.send("pong")
// })

// before it was app.listen
server.listen(port, () => {
  console.log(`server  and socket.io running at ${port}`);
});
