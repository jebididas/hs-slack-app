<html>
  <head>
  <link rel="stylesheet" href="css/main.css">
  <link href="https://fonts.googleapis.com/css?family=Lato:300,300italic,400,700,900,400italic,700italic,900italic" rel="stylesheet" type="text/css">
  <script type="text/javascript" src="js/jquery-2.2.1.min.js"></script>
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <script src="js/bootstrap.min.js"></script>
  <script src="https://d2l6uygi1pgnys.cloudfront.net/jsapi/2-0/hsp.js"></script>
  <script type="text/javascript" src="js/moment.min.js"></script>
  </head>
  <body>

    <?php include_once("analyticstracking.php") ?>

    <script type="text/javascript">
      if (localStorage.getItem('slack_access_token') == undefined){ // Check if user has been authed
        window.location.replace('login.php');
      }
    </script>
    <div id="top-menu-cont">
      <div class="channel-cont">
        <div id="channel-desc">Channel</div>
        <div id="channel-dropdown" class="dropdown">
          <button class="btn btn-xs btn-warning dropdown-toggle" type="button" id="channel-item" data-toggle="dropdown">
            No Channel
            <span class="caret"></span>
          </button>
          <ul id="dropdown-channel-menu" class="dropdown-menu scrollable-menu" aria-labelledby="channel-item">
            <li><a href="#">No Channels</a></li>
          </ul>
        </div>
      </div> 
      <div id="profile-cont">
        <div id="profile-dropdown-btn" class="btn-group">
          <button id="profile-team-name" type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            No Team <span class="caret"></span>
          </button>
          <ul class="dropdown-menu dropdown-menu-right">
            <li class="disabled">
              <img id="profile-dropdown-avatar" src="img/slack-30.png">
              <div id="profile-username"><a href="#">No User</a></div>
              <div class="clear"></div>
            </li>
            <li role="separator" class="divider"></li>
            <li><a href="https://hootsuite.com/help" target="_blank">Help</a></li>
            <li><a href="https://feedback.hootsuite.com/forums/125623-hootsuite-app-directory" target="_blank">Feedback</a></li>
            <li><a href="https://hs-slack.herokuapp.com/user-guide/index.html" target="_blank">Developer</a></li>
            <li role="separator" class="divider"></li>
            <li><a id="logout-btn" href="#">Logout</a></li>
          </ul>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <form class="slack-message-pretext-form">
      <div id="slack-message">
        <div class="left">
          <img id="slack-message-avatar">
        </div>
        <div class="center">
          <div id="slack-message-username-cont">
            <p id="slack-message-username"></p>
            <p id="slack-message-time"></p>
            <div class="clear"></div>
          </div>
          <p id="hs-sn-source"></p>
          <textarea class="form-control" rows="1" id="slack-message-pretext" placeholder="Write a message..."></textarea>
          <div id="hs-post">
            <div id="hs-post-author-cont">
              <img id="hs-post-author-img">
              <p id="hs-post-username"></p>
            </div>
            <div class="clear"></div>
            <p id="hs-post-timestamp"></p>
            <p id="hs-post-message"></p>
            <div id="hs-post-attachment-img-cont"></div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <button id="post-to-slack" class="btn btn-default post-btn" type="submit">Post to Channel</button>
    </form>
    <script type="text/javascript" src="js/handler.js"></script>
    <script type="text/javascript" src="js/textarea-auto-grow.js"></script>
  </body>
</html>