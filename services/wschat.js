let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({port: 9999});

wss.broadcast = function(msg) {
    wss.clients.forEach(function each(client) {  
        client.send(JSON.stringify(msg));  
    });  
};


module.exports = wss.on('connection', function(ws){
    ws.user = ws._socket.remoteAddress;
    wss.broadcast({"user" : ws.user, "message": "Join the room"});
    ws.on('message', function(msg, cb){
        console.log(ws.user);
        console.log(msg);
        wss.broadcast({"user" : ws.user, "message": msg});
    });

    ws.on('close', function(error){
        wss.broadcast({"user" : ws.user, "message": "Left the room"});
        for(let i = 0; i < wss.clients.length; i ++){
            if(clients[i]._socket.remoteAddress === this.user){
                clients.splice(i, 1);
            }
        }
    });

    ws.on('error',function(){
        console.log("DFF I LOVE U");
    });
});