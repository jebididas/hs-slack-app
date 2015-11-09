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
      // Clear message from storage
      localStorage.removeItem('hs_message_id');
      localStorage.removeItem('hs_datetime');
      localStorage.removeItem('hs_message');
      localStorage.removeItem('hs_username');
      localStorage.removeItem('hs_profile_image_url');

      var slack_access_token = localStorage.getItem('slack_access_token');
      var slack_team_name = localStorage.getItem('slack_team_name');
      var channel = 'No Channel'; // Initialize Channel
      var postToUser = 'No postToUser'; // Initialize postToUser
      var user_id = 'No User ID';
      var username = 'No Username'; // Initialize username

      var hs_full_date = moment(hs_datetime);
      var now_full_date = moment();

      
      console.log(now_full_date);
      var hs_message_time = hs_full_date.format("h:mm A");
      var now_message_date = now_full_date.format("h:mm A");

      // // Build message with all components
      // var full_hs_message = "@" + hs_username + "\n"
      //                     + hs_message_time + "\n"
      //                     + hs_message;
      
      $.ajax({  // GET current user info
        method: "GET",
        url: "https://slack.com/api/auth.test?token=" + localStorage.getItem('slack_access_token'),
        error: function(response, err){ console.log('GET Current user info error: ' + err) }, 
        success: function(response) {
          username = response.user;
          user_id = response.user_id;
          $('#profile-username').text(username);
          $('#profile-team-name').html(slack_team_name +  ' <span class="caret"></span>');
          $('.message-title').text(username);
        }
      })
      .done(function(){

        $.ajax({
          method: "GET",
          url: "https://slack.com/api/users.info?token=" + localStorage.getItem('slack_access_token')
            + "&user=" + user_id,
          error: function(response, err){ console.log('GET User info error: ' + err) }, 
          success: function(response) {
            $('#messageAvatar').attr('src', response.user.profile.image_32);
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
          $('#postToSlack').text('Post to ' + response.channels[0].name + ' channel');
          $('#postToSlack').removeClass('btn-default');
          $('#postToSlack').addClass('btn-warning');
          $('#dropdown-channel-menu').empty();
          
          response.channels.forEach(function(channel) {
            $listItem = $('<li>');
            $listItem.append('<a id="' + channel.id + '" class="channelSelector" href="#">' + channel.name + '</a>');
            $($listItem).appendTo('#dropdown-channel-menu');
          });

        }

      }) // End of GET Channel list
      
      .done(function(){

        $('#hs-post-username').text("@" + hs_username);
        $('#hs-post-timestamp').text(hs_message_time);
        $('#hs-post-message').text(hs_message);

        $('#message-time').text(now_message_date);


      })

      .done(function(){

        $('.channelSelector').on('click', function() {

          $('#channel-item').text($(this).text());
          $('#channel-item').append(' <span class="caret"></span>');
          $('#postToSlack').text('Post to ' + $(this).text() + ' channel');
          $('.selectedChannel').removeClass('selectedChannel');
          $(this).addClass('selectedChannel');
          $('#postToSlack').removeClass('btn-default');
          $('#postToSlack').addClass('btn-warning');
          channel = $('.selectedChannel').attr('id'); // Update channel
        });

        $('#postToSlack').on('click', function(event) {

          var pretext = $('#message-pretext').text();
          var full_pretext = "@" + hs_username + "\n"
                           + hs_message_time;
          var author_name = hs_username;
          var author_link = "https://twitter.com/" + hs_username;
          var author_icon = hs_profile_image_url;                
          var message_attachments = '[{"pretext":"' + full_pretext 
                                  + '","text":"' + pretext 
                                  + '","author_name":"' + author_name
                                  + '","author_icon":"' + author_icon
                                  + '","author_link":"' + author_link + '"}]';

          console.log(message_attachments);
          var url = "https://slack.com/api/chat.postMessage?token=" + localStorage.getItem('slack_access_token') 
                + "&channel=" + channel 
                + "&text=" + encodeURIComponent(hs_message)
                + "&attachments=" + encodeURIComponent(message_attachments)
                + "&as_user=true";              
          event.preventDefault();

          console.log(url);
         
          $.ajax({
            method: "POST",
            url: url,
            error: function(response, err){ console.log('POST To slack error: ' + err) }, 
            success: function(response) {
              $('#postToSlack').remove();
              $('.slack-message').empty();
              $('#top-menu-cont').remove();
              $('.slack-message').append('div').addClass('message-sent').text('Message sent!');
              localStorage.removeItem('pid');
              setTimeout(function(){ hsp.closeCustomPopup(apiKey,pid); }, 3000);
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
 