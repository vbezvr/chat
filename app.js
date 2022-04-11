const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get("/", (req, res) => {
   res.sendFile("index.html", { root: "." });
});

app.use(express.static(__dirname + '/assets'))
app.use(express.static(__dirname + "/js"));

io.on('connection', (socket) => {
    console.log("user connect");
})

server.listen(3000, () => {
    console.log('listening...');
});