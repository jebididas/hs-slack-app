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
        console.log('Message has not been stored in localStorage yet');
        // Store message details in storage before auth check
        localStorage.setItem('hs_message_id', hs_message_id);
        localStorage.setItem('hs_datetime', hs_datetime);
        localStorage.setItem('hs_message', hs_message);
    }else{
        console.log('Message has been stored in localStorage');
        hs_message_id = localStorage.getItem('hs_message_id');
        hs_datetime = localStorage.getItem('hs_datetime');
        hs_message = localStorage.getItem('hs_message');
    }

    hsp.showCustomPopup(handler, 'Send to Slack Channel'); 
}

$(document).ready(function() {
    hsp.init({
        useTheme: true
    });

    // Send message to plugin modal window
    hsp.bind('sendtoapp', function(message){
        var pid = getParameterByName('pid');
        console.log('PID:');
        console.log(pid);
        localStorage.setItem('pid',pid);
        console.log(message);
        sendToAppHandler(message);
    });




    // hsp.bind('sendtoapp', function(message){
    //     var userid = message.post.user.userid;
    //     var username = message.post.user.username;
    //     var avatar;
    //     if (message.post.network == 'twitter') {
    //         avatar = 'http://avatars.io/twitter/' + username;
    //     } else {
    //         avatar = 'http://avatars.io/facebook/' + userid;
    //     }
        

    //     $('.hs_topBar').after(messageTemplate({
    //         input: message.post.content.body,
    //         username: username,
    //         avatar: avatar,
    //         messageId: parseInt(1000000*Math.random(), 10) //generate random message ID for demonstration purposes
    //     }));
    // });
});