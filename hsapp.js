var messageId = "messageId=" + encodeURIComponent(message.post.id);           
var datetime  = "&datetime=" + encodeURIComponent(message.post.datetime);
var message   = "&message=" + encodeURIComponent(message.post.content.body);

function sendToAppHandler(message) {
  var handler = 'https://hs-slack.herokuapp.com/handler.html?' + messageId + message + datetime;

  hsp.showCustomPopup(handler, 'Send to Slack Channel');
}

$(document).ready(function() {
    hsp.init({
        useTheme: true
    });


    // Save message in storage
    localStorage.setItem('hs_message_id', messageId);
    localStorage.setItem('hs_message_datetime', datetime);
    localStorage.setItem('hs_message', message);

    // Check if user has been authed




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