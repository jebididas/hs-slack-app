<html>
 <head>
  <link rel="stylesheet" href="css/main.css">
  <link href="https://fonts.googleapis.com/css?family=Lato:300,300italic,400,700,900,400italic,700italic,900italic" rel="stylesheet" type="text/css">
  <script type="text/javascript" src="js/jquery-2.2.1.min.js"></script>
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <script src="js/bootstrap.min.js"></script>
  <script src="https://d2l6uygi1pgnys.cloudfront.net/jsapi/2-0/hsp.js"></script>
 </head>
 <body>

 	<?php include_once("analyticstracking.php") ?>

 	<script type="text/javascript">
 		// Check if authed
 		if(localStorage.getItem('slack_access_token') != undefined){
 			window.location.replace('handler.php');
 		}

 		$(document).ready(function(){
 			var apiKey = '2mrz5a2rqf0g8ks04gkkwowos3icn258498';
 			var pid = localStorage.getItem('pid');

 			$('#login-btn-link').on('click', function(event){
 				window.open('https://slack.com/oauth/authorize?client_id=10392449395.10392827204&scope=channels:read%20chat:write:user%20users:read%20identify&redirect_uri=https://hs-slack-app.herokuapp.com/auth.php?complete=1', '_blank');
 			});
 		});
 	</script>
 	<div id="login-cont">
 		<div id="login-btn-link">
 	  	<img id="login-btn-img" src="img/slack-30.png">
 	  	<div id="login-btn-text">Connect to Slack</div>
 	  	<div class="clear"></div>
 	  </div>
 	  <p id="register-text">Trying to create a team? <a id="register-link" target="_blank" href="https://slack.com/">Sign up on Slack</a> to get started.</p>
 	</div> 
 </body>
 </html>