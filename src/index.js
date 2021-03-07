const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, "../public");

app.use(express.static(publicDirPath));

io.on("connection", (socket) => {
	console.log("New WebSocket connection");

	socket.emit("message", "Welcome!");
	socket.broadcast.emit("message", "A new user has joined!");
	socket.on("sendMessage", (message) => {
		io.emit("message", message);
	});

	socket.on("sendLocation", (coords) => {
		io.emit(
			"message",
			`https://google.com/maps?q=${coords.lat},${coords.long}`,
		);
	});

	socket.on("disconnect", () => {
		io.emit("message", "A user has left!");
	});
});

server.listen(port, () => {
	console.log(`Server is up on post ${port}`);
});
