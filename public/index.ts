
const joinRoomButton: any = document.querySelector("#room-button");
const messageInput: any = document.querySelector("#message-input");
const roomInput: any = document.querySelector("#room-input");
const form: any = document.querySelector("form");
const socket = io("http://localhost:4006");


socket.on("connect", () => {
  displayMessage(`You connected with ID: ${socket.id}`);
  
  let user = socket.id;
  const randomColor = Math. floor(Math. random()*16777215). toString(16);
  document.body.style.backgroundColor = "#" + randomColor;
  user.nnerHTML = "#" + randomColor;
});


socket.on("recieve-message", (message) => {
  displayMessage(message);
});



form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;

  if (message === "") return;       
  displayMessage(message);          

  socket.emit("send-message", message, room);
  messageInput.value = "";          
});



joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value;
 
  socket.emit("join-room", room, (message) => {
    displayMessage(message);
  });
});



function displayMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  document.querySelector("#message-container").append(div);
}
