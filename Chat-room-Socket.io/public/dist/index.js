// import {io} from 'socket.io-client';
// const socket = io("http://localhost:3000");
var joinRoomButton = document.querySelector("#room-button");
var messageInput = document.querySelector("#message-input");
var roomInput = document.querySelector("#room-input");
var form = document.querySelector("form");
var socket = io("http://localhost:4006");
// checking the socket connection:
// event 'connect' coming down from the server and runs everytime we connect to our server
socket.on("connect", function () {
    displayMessage("You connected with ID: " + socket.id);
    // random color background
    var user = socket.id;
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = "#" + randomColor;
    user.nnerHTML = "#" + randomColor;
});
// listening for "recieve-message" sending from the server
socket.on("recieve-message", function (message) {
    displayMessage(message);
});
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var message = messageInput.value;
    var room = roomInput.value;
    if (message === "")
        return; // if we don`t have a messages the function is doing nothing,
    displayMessage(message); // othewise we`re going to call this display message
    /* 'emit' takes any event that we want and send it to the server and call this on the server:
    Here we`re passing the event 'send-message' and
    the message we`re sending.. now in the server we need to listen for this event   */
    socket.emit("send-message", message, room);
    messageInput.value = ""; // clear out the input after sending the message
});
joinRoomButton.addEventListener("click", function () {
    var room = roomInput.value;
    // Client initiats the request to the server to Join the room.
    socket.emit("join-room", room, function (message) {
        displayMessage(message);
    });
});
function displayMessage(message) {
    var div = document.createElement("div");
    div.textContent = message;
    document.querySelector("#message-container").append(div);
}
