$(document).ready(function() {

function getParameterByName(name) {  // This decodes and separates the URI into pieces
          name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
          var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
              results = regex.exec(location.search);
          return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
      }

      var apiKey = '2mrz5a2rqf0g8ks04gkkwowos3icn258498';
      var pid = localStorage.getItem('pid');

      // Retrieve and set message components 
      var hs_message_id = localStorage.getItem('hs_message_id');
      var hs_datetime = localStorage.getItem('hs_datetime');
      var hs_message = localStorage.getItem('hs_message');
      var hs_username = localStorage.getItem('hs_username');
      var hs_profile_image_url = localStorage.getItem('hs_profile_image_url');
      var hs_attachment_image_url = localStorage.getItem('hs_attachment_image_url');
      var hs_sn_source = localStorage.getItem('hs_sn_source');
      var hs_post_url = localStorage.getItem('hs_post_url');
      // Clear message from storage
      localStorage.removeItem('hs_message_id');
      localStorage.removeItem('hs_datetime');
      localStorage.removeItem('hs_message');
      localStorage.removeItem('hs_username');
      localStorage.removeItem('hs_profile_image_url');
      localStorage.removeItem('hs_attachment_image_url');
      localStorage.removeItem('hs_sn_source');
      localStorage.removeItem('hs_post_url');

      var slack_access_token = localStorage.getItem('slack_access_token');
      var slack_team_name = localStorage.getItem('slack_team_name');
      var channel = 'No Channel'; // Initialize Channel
      var postToUser = 'No postToUser'; // Initialize postToUser
      var user_id = 'No User ID';
      var username = 'No Username'; // Initialize username
      var author_name = '';
      var author_link = '';

      var hs_full_date = moment(hs_datetime);
      var now_full_date = moment();

      var hs_message_time = hs_full_date.format("h:mm A");
      var now_message_date = now_full_date.format("h:mm A");

      var hs_message_source = hs_sn_source + " message sent via Hootsuite";

      
      $.ajax({  // GET current user info
        method: "GET",
        url: "https://slack.com/api/auth.test?token=" + localStorage.getItem('slack_access_token'),
        error: function(response, err){ console.log('GET Current user info error: ' + err) }, 
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
          url: "https://slack.com/api/users.info?token=" + localStorage.getItem('slack_access_token')
            + "&user=" + user_id,
          error: function(response, err){ console.log('GET User info error: ' + err) }, 
          success: function(response) {
            $('#slack-message-avatar').attr('src', response.user.profile.image_32);
          }
        });
      });


      $.ajax({
        method: "GET",
        url: "https://slack.com/api/channels.list?token=" + localStorage.getItem('slack_access_token'),
        error: function(response, err){ console.log('GET Channels list error: ' + err) }, 
        success: function(response) {
          channel = response.channels[0].id; // Set channel to General
          $('#channel-item').html(response.channels[0].name +  ' <span class="caret"></span>'); // Sets the channel dropdown to General
          $('#post-to-slack').text('Post to ' + response.channels[0].name + ' channel');
          $('#post-to-slack').removeClass('btn-default');
          $('#post-to-slack').addClass('btn-warning');
          $('#dropdown-channel-menu').empty();
          
          response.channels.forEach(function(channel) {
            $listItem = $('<li>');
            $listItem.append('<a id="' + channel.id + '" class="channelSelector" href="#">' + channel.name + '</a>');
            $($listItem).appendTo('#dropdown-channel-menu');
          });

        }

      }) // End of GET Channel list
      
      .done(function(){

        $('#hs-sn-source').text(hs_message_source);
        if(hs_sn_source == 'twitter'){
          $('#hs-post-username').text("@" + hs_username);
          author_name = "@" + hs_username;
        }else{
          $('#hs-post-username').text(hs_username);
          author_name = hs_username;
        }
        $('#hs-post-timestamp').text(hs_message_time);
        $('#hs-post-message').text(hs_message);
        if(hs_attachment_image_url != ''){
          $('#hs-post-attachment-img').attr('src', hs_attachment_image_url).show();
        }

        $('#slack-message-time').text(now_message_date);


      })

      .done(function(){

        $('.channelSelector').on('click', function() {

          $('#channel-item').text($(this).text());
          $('#channel-item').append(' <span class="caret"></span>');
          $('#post-to-slack').text('Post to ' + $(this).text() + ' channel');
          $('.selectedChannel').removeClass('selectedChannel');
          $(this).addClass('selectedChannel');
          $('#post-to-slack').removeClass('btn-default');
          $('#post-to-slack').addClass('btn-warning');
          channel = $('.selectedChannel').attr('id'); // Update channel
        });

        $('#post-to-slack').on('click', function(event) {

          var pretext = $('#slack-message-pretext').text(); // Added user comment
          var full_message = hs_message_time + "\n" // Message as it looks in HS dashboard
                           + hs_message;
          if(hs_sn_source == 'twitter'){
            author_link = "https://twitter.com/" + hs_username;
          }else if(hs_sn_source == 'facebook'){
            author_link = hs_post_url;
          }
          var author_icon = hs_profile_image_url;                
          var message_attachments = '[{"pretext":"' + pretext
                                  + '","author_name":"' + author_name
                                  + '","author_icon":"' + author_icon
                                  + '","author_link":"' + author_link 
                                  + '","image_url":"' + hs_attachment_image_url 
                                  + '","text":"' + full_message 
                                  + '","color":"' + '#2a80b9'
                                  + '","fallback":"' + hs_message + '"}]';
    

          console.log(message_attachments);
          var url = "https://slack.com/api/chat.postMessage?token=" + localStorage.getItem('slack_access_token') 
                + "&channel=" + channel
                + "&text=" + encodeURIComponent(hs_message_source)
                + "&attachments=" + encodeURIComponent(message_attachments)
                + "&as_user=true";              
          event.preventDefault();

          console.log(url);
         
          $.ajax({
            method: "POST",
            url: url,
            error: function(response, err){ console.log('POST To slack error: ' + err) }, 
            success: function(response) {
              $('#post-to-slack').remove();
              $('#slack-message').empty();
              $('#top-menu-cont').remove();
              $('#slack-message').append('div').attr('id','message-sent').text('Message sent!');
              localStorage.removeItem('pid');
              // setTimeout(function(){ hsp.closeCustomPopup(apiKey,pid); }, 3000);
            }
          });  
        });

        $('#logout-btn').on('click', function(event){
          localStorage.removeItem('slack_access_token');
          localStorage.removeItem('slack_team_name');
          window.location.replace('login.html');
        });
      }); // End of Listeners    

}); 
 