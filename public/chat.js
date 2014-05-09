window.onload = function() {
    var messages    = [];
    var socket      = io.connect('http://localhost:3700');
    var field       = document.getElementById("field");
    var sendButton  = document.getElementById("send");
    var content     = document.getElementById("content");
    var name        = document.getElementById("name");
    var emitTest    = document.getElementById("emit");
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            // html += '<b>'+data.username+' : </b>';
            html += '<b>' + (data.username ? data.username : 'Server') + ' : </b>';
            html += data.message+'<br />';
            // for(var i=0; i<messages.length; i++) {
            //     html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ' : </b>';
            //     html += messages[i].message + '<br />';
            // }
            content.innerHTML += html;
        } 
        else 
        {
            console.log("There is a problem:", data);
        }
    });
    socket.on('emittionTest', function (data){
        alert("yippi");
    });
    sendButton.onFocus = function(){
        if(name.value == "") {
            alert("Please type your name!");
        } else {
            var text = field.value;
            socket.emit('send', { message: text, username: name.value });
            field.value = "";
        }
    }
    sendButton.onclick = sendMessage = function() {
        if(name.value == "") {
            alert("Please type your name!");
        } else {
            var text = field.value;
            socket.emit('send', { message: text, username: name.value });
            field.value = "";
        }
    };
    emitTest.onFocus = function(){
        socket.emit('emittionTest',{message:"Data Emittion Test Log"});
        alert("yuppa");
    }
    emitTest.onclick = emitMessage = function(){
        socket.emit('emittionTest',{message:"Data Emittion Test Log"});
        alert("yuppa");
    };
}
$(document).ready(function() {
    $("#field").keyup(function(e) {
        if(e.keyCode == 13) {
            sendMessage();
        }
    });
});