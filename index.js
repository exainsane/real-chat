var express = require("express");
var app = express();
var port = 3700;
var http = require('http');
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));
// app.get("/", function(req, res){
// 	res.render("page");
// });
http.createServer(function(req,res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.render("page");
}).listen(port, "192.168.21.2");

var io = require('socket.io').listen(app.listen(port));
io.sockets.on('connection', function (socket) {
	socket.emit('message', { message: 'Welcome To The Chat' });
	socket.on('send', function (data) {
		io.sockets.emit('message', data);
	});
	socket.on('emittionTest', function (data) {
		io.sockets.emit('emittionTest', data);
	});
});
console.log("Listening on port " + port);
