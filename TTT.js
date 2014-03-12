var http = require('http'),
    fs = require('fs'),
    sanitize = require('validator'),
    sys = require('util');
var gameCounter = 0;
var players = 0;
var playerJoined = false;
var IP = "192.168.0.202:1337";

var app = http.createServer(function (request, response) 
{    
  if (request.url.trim() === "/")
  {
    fs.readFile("client.html", 'utf-8', function (error, data) 
    {
      response.writeHead(200, {'Content-Type': 'text/html'});
               
      data = data.replace("[IP]",IP);        
      if (players == 0)
      { 
        data = data.replace("[PLAYER]","X"); 
        data = data.replace("[YOURTURN]","true");
        data = data.replace("[SHOW_WAITING]","solid"); 
      }
      
      if (players == 1)
      { 
        data = data.replace("[PLAYER]","O");
        data = data.replace("[YOURTURN]","false");
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


//IO work
var io = require('socket.io').listen(app);
io.sockets.on('connection', 
  function(socket) 
  {
    //On receiving a play request
    socket.on('playReq', function(data) 
    {
      if (players === 2)
      {
        var escaped_message = sanitize.escape(data["message"]);
        var playerSubmitted = sanitize.escape(data["player"]);
        io.sockets.emit("play",{ message: escaped_message, player: playerSubmitted, debug: false});
      }
      else
      {
        debug("Play request received when only one player exists");
      }
    });
    
    //On receiving a DEBUG request
    socket.on('DEBUG', function(data) 
    {      
      debug(data['message']);
    });
    
  }
);


//Boardcast a debug message
function debug(m)
{
  var escaped_message = sanitize.escape(m);
  io.sockets.emit("DEBUG",{ message: escaped_message });
}