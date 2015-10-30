function sendToAppHandler(message) {
    var messageId = "messageId=" + encodeURIComponent(message.post.id);         
    var datetime  = "&datetime=" + encodeURIComponent(message.post.datetime);
    var message   = "&message=" + encodeURIComponent(message.post.content.body);
    var handler = 'https://hs-slack.herokuapp.com/handler.html?' + messageId + message + datetime;

    // Check if message has been stored already
    if (localStorage.getItem('hs_message_id') == undefined){
        console.log('Message has not been stored in localStorage yet');
        // Store message details in storage before auth check
        localStorage.setItem('hs_message_id', messageId);
        localStorage.setItem('hs_datetime', datetime);
        localStorage.setItem('message', message);
    }else{
        console.log('Message has been stored in localStorage');
        messageId = localStorage.getItem('hs_message_id');
        datetime = localStorage.getItem('datetime');
        message = localStorage.getItem('message');
    }

    // Check if user has been authed
    if (localStorage.getItem('slack_access_token') != undefined){
        console.log('Slack token found - user has authed');
        // Clear message from storage
        localStorage.removeItem('hs_message_id');
        localStorage.removeItem('hs_datetime');
        localStorage.removeItem('message');

        hsp.showCustomPopup(handler, 'Send to Slack Channel');
    }else{
        console.log('Slack token NOT found - user has NOT authed yet');
        window.location.reload('login.html');
    }
    
}

$(document).ready(function() {
    hsp.init({
        useTheme: true
    });

    // Send message to plugin modal window
    hsp.bind('sendtoapp', function(message){
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