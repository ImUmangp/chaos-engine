const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const server = http.createServer(app);
const io = new Server(server);

let currentMode = "normal";

io.on("connection", (socket) => {
    console.log("User connected");
    socket.emit("modeChange", currentMode);
});

app.post("/trigger", (req, res) => {
    const { keyword } = req.body;

    if (!keyword) return res.status(400).send("Keyword required");

    currentMode = keyword.toLowerCase();
    io.emit("modeChange", currentMode);

    res.send({ status: "updated", mode: currentMode });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
