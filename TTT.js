var http = require('http'),
    fs = require('fs'),
    sanitize = require('validator');

var userCounter = 0; 

var app = http.createServer(function (request, response) 
{
  userCounter++;
  fs.readFile("client.html", 'utf-8', function (error, data) 
  {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(data);
    response.end();
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
      io.sockets.emit("message_to_client",{ message: escaped_message});
    });
  }
);