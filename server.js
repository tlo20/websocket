/**/
const WebSocket = require('ws');

// Create a new WebSocket server
const wss = new WebSocket.Server({
  port: 8080
},()=>{
  console.log("ws server listening at port 8080")
});

// Keep track of all connected clients
let clients = [];

// This function is called whenever a client connects to the server
wss.on('connection', function(ws) {
  // Add the client to the list of connected clients
  clients.push(ws);

  // This function is called whenever a message is received from the client
  ws.on('message', function(message,isBinary) {
    
    // Loop through all connected clients and broadcast the message
    for (let i = 0; i < clients.length; i++) {
      clients[i].send(message.toString());
    }
  });

  // This function is called when the client disconnects
  ws.on('close', function() {
    // Remove the client from the list of connected clients
    clients = clients.filter(function(client) {
      return client !== ws;
    });
  });
});

const express = require("express")
const app = express()
const path = require("path")

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})

app.listen(8090,()=>{console.log(`app listening at port 8090`)})
