function getParameterByName(name) {  // This decodes and separates the URI into pieces
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function sendToAppHandler(message) {
    var hs_message_id = message.post.id;
    var hs_datetime = message.post.datetime;
    var hs_message = message.post.content.body; // Not sure if we need the other variables below to be sent to handler
    var messageId = "messageId=" + encodeURIComponent(message.post.id);         
    var datetime  = "&datetime=" + encodeURIComponent(message.post.datetime);
    var message   = "&message=" + encodeURIComponent(message.post.content.body);
    var handler = 'https://hs-slack.herokuapp.com/handler.html?' + messageId + message + datetime;

    // Check if message has been stored already
    if (localStorage.getItem('hs_message_id') == undefined){
        // Store message details in storage before auth check
        localStorage.setItem('hs_message_id', hs_message_id);
        localStorage.setItem('hs_datetime', hs_datetime);
        localStorage.setItem('hs_message', hs_message);
    }else{
        hs_message_id = localStorage.getItem('hs_message_id');
        hs_datetime = localStorage.getItem('hs_datetime');
        hs_message = localStorage.getItem('hs_message');
    }

    hsp.showCustomPopup(handler, 'Send to Slack'); 
}

$(document).ready(function() {

    hsp.init({
        useTheme: true
    });

    // Send message to plugin modal window
    hsp.bind('sendtoapp', function(message){
        localStorage.setItem('pid',getParameterByName('pid');
        console.log(message);
        sendToAppHandler(message);
    });

});