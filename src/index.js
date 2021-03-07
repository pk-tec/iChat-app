const express = require("express");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, "../public");

app.use(express.static(publicDirPath));





server.listen(port, () => {
	console.log(`Server is up on post ${port}`);
});
