function getParameterByName(name) {  // This decodes and separates the URI into pieces
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function sendToAppHandler(message) {
    var hs_message_id = message.post.id;
    var hs_datetime = message.post.datetime;
    var hs_message = message.post.content.body;
    var hs_username = message.post.user.username;
    var hs_sn_source = message.post.network;
    var hs_profile_image_url = '';

    if(hs_sn_source === 'twitter' || hs_sn_source === 'TWITTER'){
        hs_profile_image_url = message.profile.profile_image_url_https;
    }else if(hs_sn_source === 'facebook' || hs_sn_source === 'FACEBOOK'){
        hs_profile_image_url = message.profile.picture;
    }
    
    var hs_attachment_image_urls = [];
    var img_ctr = 0;
    message.post.attachments.forEach(function(hs_attachment){
        if(hs_attachment !== undefined && hs_attachment.type === 'image'){
            hs_attachment_image_urls[img_ctr] = hs_attachment.thumbnail;
            img_ctr++;
        }
    })

    
    var hs_post_url = message.post.href;
    var handler = 'https://hs-slack.herokuapp.com/handler.html';

    hsp.saveData(
    {
        s_message_id: hs_message_id,
        s_datetime: hs_datetime,
        s_message: hs_message,
        s_username: hs_username,
        s_profile_image_url: hs_profile_image_url,
        s_attachment_image_urls: hs_attachment_image_urls,
        s_sn_source: hs_sn_source,
        s_post_url: hs_post_url
    },
    function(data){
    });

    hsp.showCustomPopup(handler, 'Send to Slack'); 
}

$(document).ready(function() {

    hsp.init({
        useTheme: true
    });

    // Send message to plugin modal window
    hsp.bind('sendtoapp', function(message){
        localStorage.setItem('pid', getParameterByName('pid'));
        sendToAppHandler(message);
    });

});