var express = require("express");
var app = express();
var port = 3889;
app.set('views',__dirname+'/rct');
app.set('view engine', 'jade');
app.engine('jade',require('jade').__express);
app.use(express.static(__dirname+'/public'));
app.get("/", function(req, res){
	res.render("index");
});
var io =  require('socket.io').listen(app.listen(port));
io.sockets.on('connection', function(socket){
	socket.emit('appendText', {
		textinput:"Welcome...",
		nickname:""
	});
	socket.emit('appendText', {
		textinput:"Please Enter Your Nickname and Message",
		nickname:""
	});
	socket.emit('appendText', {
		textinput:"Your Nickname will be automatically locked after you send your first message",
		nickname:""
	});
	socket.on('appendText', function(data){
		io.sockets.emit('appendText', data);
	});

});
console.log("Listening on Localhost, port "+port);