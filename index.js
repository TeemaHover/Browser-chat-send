const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const connectionString = `mongodb+srv://Temuulen:12345678Ab@cluster0.i9q9ff8.mongodb.net/`;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.error("Connection error", err);
  });
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/chatHistory", async (req, res) => {
  const messages = await ChatMessage.find();
  res.json(messages);
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("chat", (data) => {
    console.log("Message received:", data);
    io.emit("chat", data);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.listen(port, () => {
  console.log(`Example app listening port ${port}`);
});
