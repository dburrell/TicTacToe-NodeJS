var http = require('http'),
    fs = require('fs'),
    sanitize = require('validator');

var gameCounter = 0;
var playerJoined = false;

var app = http.createServer(function (request, response) 
{  
  
  fs.readFile("client.html", 'utf-8', function (error, data) 
  {
    response.writeHead(200, {'Content-Type': 'text/html'});
  
    if (playerJoined == false)
    {
      data = data.replace("[PLAYER]","X");
    }
    else
    {
      data = data.replace("[PLAYER]","O");
    }
               
    response.write(data);
    response.end();
    playerJoined = true;
  });
}).listen(1337);


var counter = 0; 


var io = require('socket.io').listen(app);
io.sockets.on('connection', 
  function(socket) 
  {
    socket.on('message_to_server', function(data) 
    {
      counter++;
      var escaped_message = sanitize.escape(data["message"]);
      var playerSubmitted = sanitize.escape(data["player"]);
      io.sockets.emit("message_to_client",{ message: escaped_message, player: playerSubmitted});
    });
  }
);