// const io = require("socket.io")(3000, {
//   cors: {
//     origin: ["http://localhost:8080"],
//   },
// });
// io.on('connection', socket => {
//  console.log(socket.id)
// })
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
    /* whenever a socket listens and hears this 'send-message' event its
    going to call a function with all this information we`re sending from the client. */
    socket.on("send-message", (message, room) => {
        if (room === "") { //  checking if the room is empty, then we broadcast to everyone 
            /* "sending the message to everyone"
            'io.emit' sending a message to ALL different clients,
            including the client that actually made the request in the first place. */
            /* 'socket.broadcast.emit' - sending the message for All clients,
            EXEPT the client that sent the message.
            We take the current socket and from that socket to broadcast the message
            to every other socket that isn`t me:       */
            socket.broadcast.emit("recieve-message", message);
        }
        else {
            /* "sending the message to specific client by his ID"
            By default every user has their own room, that is their ID.
            So if we want to send a message to another user, we can just send it to a room that
            is thir ID.
            We adding the room variable in 'socket.on("send-message", (message, room) =>'.
            The '.to()' is already does this broadcast portion.  */
            socket.to(room).emit("recieve-message", message); // sending a message specifically to that room
        }
        console.log(message);
    });
    // "sending the message to multiple people but not to everyone"
    // this callback is called from the server to the client
    socket.on("join-room", (room, callback) => {
        socket.join(room);
        callback(`${room} joined`);
    });
});
server.listen(4006, () => {
    console.log("Socket is listening on: 4006");
});
