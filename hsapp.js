$(document).ready(function() {

    var messageId = "messageId=" + encodeURIComponent(message.post.id);         
    var datetime  = "&datetime=" + encodeURIComponent(message.post.datetime);
    var message   = "&message=" + encodeURIComponent(message.post.content.body);

    function sendToAppHandler(message) {
      var handler = 'https://hs-slack.herokuapp.com/handler.html?' + messageId + message + datetime;

      hsp.showCustomPopup(handler, 'Send to Slack Channel');
    }

    
    hsp.init({
        useTheme: true
    });

    // Check if message has been stored already
    if (localstorage.getItem('hs_message_id') == undefined){
        console.log('Message has not been stored in localstorage yet');
        // Store message details in storage before auth check
        localstorage.setItem('hs_message_id', messageId);
        localstorage.setItem('hs_datetime', datetime);
        localstorage.setItem('message', message);
    }else{
        console.log('Message has been stored in localstorage');
        messageId = localstorage.getItem('hs_message_id');
        datetime = localstorage.getItem('datetime');
        message = localstorage.getItem('message');
    }

    // Check if user has been authed
    if (localstorage.getItem('slack_team_token') != undefined){
        console.log('Slack token found - user has authed');
        // Clear message from storage
        localstorage.removeItem('hs_message_id');
        localstorage.removeItem('hs_datetime');
        localstorage.removeItem('message');

        // Send message to plugin modal window
        hsp.bind('sendtoapp', function(message){
            sendToAppHandler(message);
        });
    }else{
        console.log('Slack token NOT found - user has NOT authed yet');
        window.location.reload('login.html');
    }




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