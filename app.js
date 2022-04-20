import * as http from 'http';
import express from "express";
import * as socketIO from "socket.io";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const server = http.createServer(app);
const io = new socketIO.Server(server);

app.get("/", (req, res) => {
   res.sendFile("index.html", { root: "." });
});

app.use(express.static(__dirname + '/assets'))
app.use(express.static(__dirname + "/js"));

io.on('connection', (socket) => {
    console.log("user connect");
    socket.on("chat message", (data) => {
        io.emit("chat message", data)
    })
})

server.listen(3000, () => {
    console.log('listening...');
});

