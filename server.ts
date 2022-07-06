
console.log(`I'm connected!`);
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
let io = new Server(server);
app.use(express.static("public"));
app.use(express.json());


io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("send-message", (message, room) => {
    if (room === "") {         
      socket.broadcast.emit("recieve-message", message);
    } else {
      socket.to(room).emit("recieve-message", message); 
    }
    console.log(message);
  });

  // "sending the message to multiple people but not to everyone"

  socket.on("join-room", (room, callback) => {
    socket.join(room);
    callback(`${room} joined`);
  });
});



server.listen(4006, () => {
  console.log("Socket is listening on: 4006");
});
