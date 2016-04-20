<?php
include_once("auth-creds.php");
?>
<!DOCTYPE html>
<html>
<head>
  <script type="text/javascript" src="js/jquery-2.2.1.min.js"></script>
</head>
<body>

<?php include_once("analyticstracking.php") ?>

<script type="text/javascript">
  function getParameterByName(name) {  // This decodes and separates the URI into pieces
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  var redirect_uri = getParameterByName('complete');
  if(redirect_uri === '1'){
    console.log('complete equals 1');
    window.opener.location.reload();
  }

  var code = getParameterByName('code');
  var client_id = <?php echo json_encode(CLIENT_ID); ?>;
  var client_secret = <?php echo json_encode(CLIENT_SECRET); ?>;
  console.log('client_id: ',client_id);
  console.log('client_secret: ',client_secret);

  $.ajax({
    method: 'POST',
    url: 'https://slack.com/api/oauth.access?client_id=' + client_id + '&client_secret=' + client_secret + '&code=' + code,
    error: function(response, err){ console.log('Auth Post Request: ' + err) }, 
    success: function(response) { 
    	localStorage.setItem('slack_access_token', response.access_token);
    	localStorage.setItem('slack_team_name', response.team_name);
      close();
    }
  });	
</script>
</body>
</html>