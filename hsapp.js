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
    var hs_username = message.post.user.username;
    var hs_profile_image_url = message.profile.profile_image_url_https;
    var hs_attachment_image_url = '';
    var attachment_image_url = '';
    if(message.post.attachments[0] != undefined && message.post.attachments[0].type == "image"){
        hs_attachment_image_url = message.post.attachments[0].thumbnail;
        attachment_image_url = "&attachement_image_url=" + encodeURIComponent(hs_attachment_image_url);
    }
    var hs_sn_source = message.post.network;
   
    var messageId = "messageId=" + encodeURIComponent(hs_message_id);         
    var datetime = "&datetime=" + encodeURIComponent(hs_datetime);
    var message = "&message=" + encodeURIComponent(hs_message);
    var username = "&username=" + encodeURIComponent(hs_username);
    var profile_image_url = "&profile_image_url" + encodeURIComponent(hs_profile_image_url);
    var sn_source = "&sn_source" + encodeURIComponent(hs_sn_source);

    var handler = 'https://hs-slack.herokuapp.com/handler.html?' + messageId + message + username + profile_image_url + attachment_image_url + sn_source + datetime;

    // Check if message has been stored already
    if (localStorage.getItem('hs_message_id') == undefined){
        // Store message details in storage before auth check
        localStorage.setItem('hs_message_id', hs_message_id);
        localStorage.setItem('hs_datetime', hs_datetime);
        localStorage.setItem('hs_message', hs_message);
        localStorage.setItem('hs_username', hs_username);
        localStorage.setItem('hs_profile_image_url', hs_profile_image_url);
        localStorage.setItem('hs_attachment_image_url', hs_attachment_image_url);
        localStorage.setItem('hs_sn_source', hs_sn_source);
    }else{
        hs_message_id = localStorage.getItem('hs_message_id');
        hs_datetime = localStorage.getItem('hs_datetime');
        hs_message = localStorage.getItem('hs_message');
        hs_username = localStorage.getItem('hs_username');
        hs_profile_image_url = localStorage.getItem('hs_profile_image_url');
        hs_attachment_image_url = localStorage.getItem('hs_attachment_image_url');
        hs_sn_source = localStorage.getItem('hs_sn_source');
    }

    hsp.showCustomPopup(handler, 'Send to Slack'); 
}

$(document).ready(function() {

    hsp.init({
        useTheme: true
    });

    // Send message to plugin modal window
    hsp.bind('sendtoapp', function(message){
        localStorage.setItem('pid', getParameterByName('pid'));
        console.log(message);
        sendToAppHandler(message);
    });

});