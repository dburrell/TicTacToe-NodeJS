var http = require('http'),
    fs = require('fs'),
    sanitize = require('validator'),
    sys = require('util');
var gameCounter = 0;
var players = 0;
var playerJoined = false;

var app = http.createServer(function (request, response) 
{    
  if (request.url.trim() === "/")
  {
    fs.readFile("client.html", 'utf-8', function (error, data) 
    {
      response.writeHead(200, {'Content-Type': 'text/html'});
               
      if (players == 0)
      { 
        data = data.replace("[PLAYER]","X"); 
        data = data.replace("[SHOW_WAITING]","solid"); 
      }
      
      if (players == 1)
      { 
        data = data.replace("[PLAYER]","O");
        data = data.replace("[SHOW_WAITING]","none"); 
        io.sockets.emit("player2joined",{});
       }
                 
      if (players > 1)
      { data = "Sorry, there are already 2 players"; }
                 
      response.write(data);
      response.end();      
      players++; 
    });  
  }
  else
  {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write("");
    response.end();    
  }
}).listen(1337);



var io = require('socket.io').listen(app);
io.sockets.on('connection', 
  function(socket) 
  {
    socket.on('message_to_server', function(data) 
    {
      if (players === 2)
      {
        var escaped_message = sanitize.escape(data["message"]);
        var playerSubmitted = sanitize.escape(data["player"]);
        io.sockets.emit("message_to_client",{ message: escaped_message, player: playerSubmitted, debug: false});
      }
      else
      {
      
      }
    });
  }
);