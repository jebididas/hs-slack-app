function dataHandler(data) {

  var apiKey = '2mrz5a2rqf0g8ks04gkkwowos3icn258498';
  var pid = localStorage.getItem('pid');

  var hs_message_id = data.s_message_id;
  var hs_datetime = data.s_datetime;
  var hs_message = data.s_message;
  var hs_username = data.s_username;
  var hs_profile_image_url = data.s_profile_image_url;
  var hs_attachment_image_urls = data.s_attachment_image_urls;
  var hs_sn_source = data.s_sn_source;
  var hs_post_url = data.s_post_url;

  var slack_access_token = localStorage.getItem('slack_access_token');
  var slack_team_name = localStorage.getItem('slack_team_name');
  var channel = '';
  var user_id = '';
  var username = '';
  var author_name = '';
  var author_link = '';
  var slack_attachment_color = '#3b5998';
  var hs_full_date = moment(hs_datetime);
  var now_full_date = moment();
  var hs_message_time = hs_full_date.format("MMM D h:mm A");
  var now_message_date = now_full_date.format("h:mm A");
  var hs_message_source = hs_sn_source + " message sent via Hootsuite";

  
  $.ajax({ 
    method: "GET",
    url: "https://slack.com/api/auth.test?token=" + localStorage.getItem('slack_access_token'),
    error: function(response, err){ 
      console.log('GET Current user info error: ' + err); 
      hsp.showStatusMessage('Failed Slack authentication', 'error') 
    }, 
    success: function(response) {
      username = response.user;
      user_id = response.user_id;
      $('#profile-username').text(username);
      $('#profile-team-name').html(slack_team_name +  ' <span class="caret"></span>');
      $('#slack-message-username').text(username);
    }
  })

  .done(function(){

    $.ajax({ 
      method: "GET",
      url: "https://slack.com/api/users.info?token=" + localStorage.getItem('slack_access_token') + "&user=" + user_id,
      error: function(response, err){ 
        console.log('GET User info error: ' + err); 
        hsp.showStatusMessage('Could not retrieve Slack user info', 'error'); 
      }, 
      success: function(response) {
        $('#slack-message-avatar').attr('src', response.user.profile.image_32);
        $('#profile-dropdown-avatar').attr('src', response.user.profile.image_32);
      }
    });
  }); 

  $.ajax({ 
    method: "GET",
    url: "https://slack.com/api/channels.list?token=" + localStorage.getItem('slack_access_token'),
    error: function(response, err){ 
      console.log('GET Channels list error: ' + err);
      hsp.showStatusMessage('Could not retrieve Slack channels', 'error'); 
    },
    success: function(response) {
      channel = response.channels[0].id; // Set channel to General
      $('#channel-item').html(response.channels[0].name +  ' <span class="caret"></span>'); // Sets the channel dropdown to General
      $('#post-to-slack').text('Post to ' + response.channels[0].name + ' channel');
      $('#post-to-slack').removeClass('btn-default');
      $('#post-to-slack').addClass('btn-warning');
      $('#dropdown-channel-menu').empty();
      
      response.channels.forEach(function(channel) {
        $listItem = $('<li>');
        $listItem.append('<a id="' + channel.id + '" class="channel-selector" href="#">' + channel.name + '</a>');
        $($listItem).appendTo('#dropdown-channel-menu');
      });
    }
  })
  
  .done(function(){
    $('#hs-post-author-img').attr('src', hs_profile_image_url);
    $('#hs-sn-source').text(hs_message_source);
    
    if(hs_sn_source == 'twitter' || hs_sn_source === 'TWITTER'){
      $('#hs-post-username').text("@" + hs_username);
      author_name = "@" + hs_username;
    }else{
      $('#hs-post-username').text(hs_username);
      author_name = hs_username;
    }

    $('#hs-post-timestamp').text(hs_message_time);
    $('#hs-post-message').text(hs_message);

    if(typeof hs_attachment_image_urls !== 'undefined' && hs_attachment_image_urls.length > 0){
      var img_id_ctr = 0;
      hs_attachment_image_urls.forEach(function(img_src){
        var img_id_name = 'attached-img-' + img_id_ctr;
        var hs_img = $('<img>');
        hs_img.addClass('hs-post-attachment-img');
        hs_img.attr({
          src: img_src, 
          id: img_id_name
        });
        hs_img.appendTo($('#hs-post-attachment-img-cont'));
        img_id_ctr++;
      });
    }

    $('#slack-message-time').text(now_message_date);
  })

.done(function(){

  $('.channel-selector').on('click', function() {
    $('#channel-item').text($(this).text());
    $('#channel-item').append(' <span class="caret"></span>');
    $('#post-to-slack').text('Post to ' + $(this).text() + ' channel');
    $('.selected-channel').removeClass('channel-selector');
    $(this).addClass('selected-channel');
    $('#post-to-slack').removeClass('btn-default');
    $('#post-to-slack').addClass('btn-warning');
    channel = $('.selected-channel').attr('id'); // Update channel
  });

  $('#post-to-slack').on('click', function(event) {
      hs_message_source = "*" + hs_sn_source + " message sent via Hootsuite*"; // Asterix is for bold in Slack
      var pretext = $('#slack-message-pretext').val();
      var full_message = hs_message_time + "\n" + hs_message;// Message as it looks in HS dashboard
      var author_icon = hs_profile_image_url;
      
      if(hs_sn_source == 'twitter' || hs_sn_source === 'TWITTER'){
        author_link = "https://twitter.com/" + hs_username;
        slack_attachment_color = '#55acee';
      }else if(hs_sn_source == 'facebook' || hs_sn_source === 'FACEBOOK'){
        author_link = hs_post_url;
        slack_attachment_color = '#3b5998';
      } 

      if(typeof hs_attachment_image_urls && !hs_attachment_image_urls){ // No attached img
        var message_attachments = '[{"pretext":"' + pretext
        + '","author_name":"' + author_name
        + '","author_icon":"' + author_icon
        + '","author_link":"' + author_link
        + '","text":"' + full_message 
        + '","color":"' + slack_attachment_color
        + '","fallback":"' + hs_message + '"}]';
      } 
      else if(typeof hs_attachment_image_urls && hs_attachment_image_urls.length === 1){ // One attached img
        var message_attachments = '[{"pretext":"' + pretext
        + '","author_name":"' + author_name
        + '","author_icon":"' + author_icon
        + '","author_link":"' + author_link 
        + '","image_url":"' + hs_attachment_image_urls 
        + '","text":"' + full_message 
        + '","color":"' + slack_attachment_color
        + '","fallback":"' + hs_message + '"}]';
      } else if(typeof hs_attachment_image_urls && hs_attachment_image_urls.length > 1) { // More than one attached img
        var message_attachments = '[{"pretext":"' + pretext
        + '","author_name":"' + author_name
        + '","author_icon":"' + author_icon
        + '","author_link":"' + author_link
        + '","text":"' + full_message 
        + '","color":"' + slack_attachment_color
        + '","fallback":"' + hs_message + '"},';

        var img_src_ctr = 0;
        hs_attachment_image_urls.forEach(function(img_src){
          message_attachments += '{"image_url":"' + hs_attachment_image_urls[img_src_ctr] 
          + '","color":"' + slack_attachment_color
          + '","fallback":"' + hs_message + '"}';
          img_src_ctr++;

          if(img_src_ctr <= (hs_attachment_image_urls.length - 1)){
            message_attachments += ',';
          }                         
        });

        message_attachments += ']';
      } // End of multiple attachments            

      var url = "https://slack.com/api/chat.postMessage?token=" + localStorage.getItem('slack_access_token') 
        + "&channel=" + channel
        + "&text=" + encodeURIComponent(hs_message_source)
        + "&attachments=" + encodeURIComponent(message_attachments)
        + "&as_user=true";              
      event.preventDefault();

      $.ajax({
        method: "POST",
        url: url,
        error: function(response, err){ 
          console.log('POST To slack error: ' + err);
          hsp.showStatusMessage('Could not post message to Slack', 'error'); 
        }, 
        success: function(response) {
          $('#post-to-slack').remove();
          $('#slack-message').empty();
          $('#top-menu-cont').remove();
          $('#slack-message').append('div').attr('id','message-sent').text('Message sent!');
          localStorage.removeItem('pid');
          setTimeout(function(){ hsp.closeCustomPopup(apiKey,pid); }, 2000);
        }
      });  
    });

    $('#logout-btn').on('click', function(event){
      localStorage.removeItem('slack_access_token');
      localStorage.removeItem('slack_team_name');
      window.location.replace('login.php');
    });
  }); // End of Listeners    
} // End of dataHandler


$(document).ready(function() {

  var apiKey = '2mrz5a2rqf0g8ks04gkkwowos3icn258498';
  var pid = localStorage.getItem('pid');

  parent.frames[apiKey + '_' + pid].hsp.getData(function(data){
    parent.frames['appdirectorypopup_' + pid].dataHandler(data);
  });

}); 
