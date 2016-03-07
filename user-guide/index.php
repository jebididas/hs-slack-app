<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<meta charset="utf-8">
		<title>Slack for Hootsuite</title>
		<meta name="generator" content="Bootply" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="shortcut icon" href="img/favicon.ico">
		<!--[if lt IE 9]>
			<script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
		<link href="css/styles.css" rel="stylesheet">
	</head>
	<body>

  <?php include_once("analyticstracking.php") ?>

<nav class="navbar navbar-default navbar-fixed-top" role="banner">
  <div class="container nav-cont">
    <div class="navbar-header">
      <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a href="/" class="navbar-brand"><img src="../img/hootsuite-nav-logo.png" class="hs-logo-square img-responsive"></a>
    </div>
    <nav class="collapse navbar-collapse" role="navigation">
      <ul class="nav navbar-nav">
      </ul>
    </nav>
  </div>
</nav>

<div id="masthead">  
  <div class="container">
      <div class="row">
        <div class="col-md-7">
          <h1>Slack for Hootsuite
            <p class="lead">Email Killer meets Social Media Master</p>
          </h1>
        </div>
        <div class="col-md-5">
            <div class="well well-lg"> 
              <div class="row">
                <div class="col-lg-12 col-sm-6 center-text">
                  <p class="add-to-slack-text lead">Install the Slack app for Hootsuite now!</p>
                  <p class="add-to-slack-button">
                    <a href="https://slack.com/oauth/authorize?scope=incoming-webhook&client_id=10392449395.10392827204"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" class="img-responsive" redirect_uri="http://appdirectory.hootsuite.com/240/slack" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
                  </p>
                </div>
              </div>
            </div>
        </div>
      </div> 
  </div><!--/container-->
</div><!--/masthead-->

<!--main-->
<div class="container">
	<div class="row">
      <!--left-->
      <div class="col-md-3" id="leftCol">
        <ul class="nav nav-stacked" id="sidebar">
          <li><a href="#sec0">Overview</a></li>
          <li><a href="#sec1">What you need</a></li>
          <li><a href="#sec2">Installing Slack for Hootsuite</a></li>
          <li><a href="#sec3">Using the app</a></li>
          <li><a href="#sec4">FAQ</a></li>
          <li><a href="#sec5">Uninstalling the app</a></li>
          <li><a href="#sec6">Help</a></li>
        </ul>
      </div><!--/left-->
      
      <!--right-->
      <div class="col-md-9">
        <h2 id="sec0">Overview</h2>
        <p>
          The Slack app for Hootsuite allows you to select a social media post, add a comment and send the post directly to a Slack Channel within your team.
        </p>
        <p class="center-text">
          <img src="../slack-screenshot3.png" class="img-responsive overview-img" alt="Hootsuite Slack App" title="Hootsuite Slack App">
        </p>
        <hr>
        <h2 id="sec1">What you need</h2>
        <p>

        </p>
        <div class="row">
          <div class="col-md-6">
            <div class="panel panel-default">
              <div class="panel-heading">
                <img class="img-responsive account-img" src="img/slack-256.png">
                <h3>Slack account</h3>
                <div class="clear"></div></div>
              <div class="panel-body">Sign in with your existing Slack team or create one for free now!
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="panel panel-default">
              <div class="panel-heading">
                <img class="img-responsive account-img" src="img/hootsuite-logo-square.png">
                <h3>Hootsuite account</h3>
                <div class="clear"></div>
              </div>
              <div class="panel-body">Use the Slack for Hootsuite app with a Free, Pro, or Enterprise Hootsuite account.
              </div>
              
            </div>
          </div>  
        </div>
        
        <hr>
        
        <h2 id="sec2">Installing Slack for Hootsuite</h2>
        <p>
          From your Hootsuite dashboard, click on the App Directory side menu item.  Once the modal opens search for Slack in All Apps and click Install.
        </p>
        <img class="img-responsive" src="img/hs-slack-install-1.png" title="Open App Directory from Hootsuite Dashboard" alt="Hootsuite App Directory">
        <p></p>
        <p>
          After clicking <strong>Install</strong>, a new window will open where you can select to add a
          Slack plugin within to an existing Hootsuite tab.
        </p>
        <div class="row">
          <div class="col-md-4"><img src="img/hs-slack-install-2.png" class="img-responsive"></div>
          <div class="col-md-4"><img src="img/hs-slack-install-3.png" class="img-responsive"></div>
          <div class="col-md-4"><img src="img/hs-slack-install-4.png" class="img-responsive"></div>
        </div>
        <p>
          Now that the app is installed, you can navigate to an existing Hootsuite stream, click the ellipsis on a post and select <strong>Send to Slack</strong>
        </p>
        <div class="row">
          <img src="img/hs-slack-install-5.png" class="img-responsive">
        </div>
        <p>
          This will trigger a modal window to display with a link to login to the app. Follow the authorization process.
        </p>
        <div class="row">
          <div class="col-md-4"><img src="img/hs-slack-install-6.png" class="img-responsive"></div>
          <div class="col-md-4"><img src="img/hs-slack-install-7.png" class="img-responsive"></div>
          <div class="col-md-4"><img src="img/hs-slack-install-8.png" class="img-responsive"></div>
        </div>
        <hr>
        
        <h2 id="sec3">Using the app</h2>
        <p>
          Once you have the app installed, it's time to send some Hootsuite messages to Slack!
        </p>
        
        <h3>Select the Slack Channel</h3>
        <p>
          Click the dropdown to select the Slack Channel you want to send to.
        </p>
        <img src="img/hs-slack-install-9-x.png" class="img-responsive">

        <hr>
        <h3>Write a comment along with the post</h3>
        <p>
          Easily add a quick comment describing the post.
        </p>
        <img src="img/hs-slack-install-10-x.png" class="img-responsive">

        <hr>
        <h3>Send it!</h3>
        <p>
          Hit the <strong>Post to Channel</strong> button! Boom! Sent! Done!
        </p>
        <img src="img/hs-slack-install-11-x.png" class="img-responsive">

        <hr>
        <h2 id="sec4">FAQ</h2>
        <h3>Are multiple images supported?</h3>
        <p>
          Yes!
        </p>
        <h3>Can I send a message directly to a user?</h3>
        <p>
          No, only to a channel.
        </p>
        
        <hr>        
        <h2 id="sec5">Uninstalling the app</h2>
        <p>
          Not that you would ever want to uninstall the Slack app for Hootsuite....but if for some reason someone forced you to uninstall it, here are the steps.
        </p>

        <h3>Open the App Directory</h3>
        <p>
          Navigate to the Slack app in <strong>Installed Apps</strong> and click the garbage can icon to remove the app.
        </p>
        <img src="img/hs-slack-install-12.png" class="img-responsive">
        <hr>

        <h2 id="sec6">Help</h2>
        <p>
          Still not getting what you need? <a href="https://hootsuite.com/help" target="_blank"> Contact the Hootsuite support team! </a>
        </p>
        <a href="https://hootsuite.com/help" target="_blank"><img src="img/hootsuite-logo-square.png" class="img-responsive"></a>

        </div><!--/right-->
  	</div><!--/row-->
</div><!--/container-->



	<!-- script references -->
		<script src="js/jquery-2.2.0.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/scripts.js"></script>
	</body>
</html>