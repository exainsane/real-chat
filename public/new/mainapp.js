var socket;
window.onload = function(){
	var h6Content = document.getElementById('textbox');
	var textArea = document.getElementById('inputArea')
	socket = io.connect('http://localhost:3889');
	var nickname;
	var nickStyle;
	var textbox = document.getElementById('typeWriter');
	socket.on('appendText', function(data){
		if(!data.textinput){
			h6Content.innerHTML += '';	
		}
		else
		{
			if(data.nickname != '') nickname = data.nickname;
			else nickname = "Server";

			if(nickname == "Server") nickStyle = "server-show";
			else nickStyle = "nick-show";
			h6Content.innerHTML += "<font id='"+nickStyle+"'>"+nickname+"</font> : "+data.textinput+"<hr>";
		}
		textbox.scrollTop = textbox.scrollHeight;
	});

}
$(document).ready(function(){
	$(".content").draggable({containment:"body", scroll:false});
	$("#inputArea").keyup(function(e){
		if(e.keyCode == 13){
			var ti = $(this).val();
			var nick = $("#nickname")
			var un = nick.val();
			if(un == ''){
				alert("Enter Your Nickname FIRST!");
			}
			else if(un == "Server" || un == "server"){
				alert("Sorry, you cant use '"+un+"' as your nickname, try another one!");
			}
			else{
				
				$(this).val('');
				if(nick.prop("disabled")==false){
					nick.prop("disabled", "true");
				}
				socket.emit('appendText', {textinput:ti, nickname:un});
				$('title').html("RTC : "+un);
			}
			
		}
	});
});