const WebSocket = require('ws');
const http = require('http');

// import { createServer } from 'https';
// import { WebSocketServer } from 'ws';

//This will return a new instance of the http create server class
const server = http.createServer();

//Create a new web socket server instance
const wss = new WebSocket.WebSocketServer({ server });

//web socket server to listen for any connection
wss.on('connection', function connection(ws) {

    ws.send('Welcome client :) ')

    //listen for any incoming messages
    ws.on('message', function message(data) {
        //loop through all the clients in the set
        wss.clients.forEach(function each(client) {
            //check if the client's websocket is ready
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(`${data}`);
            }
        });
    });

});

//have the http server listen on port 8080
server.listen(8080, () => {
    console.log("Now listening on port 8080")
});
