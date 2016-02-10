<?php
	require('db-connection-creds.php');

	// Grab HS creds from uninstall callback url within Dev Portal
	$i = $_POST['i'];
	$ts = $_POST['ts'];
	$token = $_POST['token'];

	// Connect to db
	$dbc = pg_connect("host=" . $dbhost . " dbname=" . $dbname . " user=" . $dbuser . " password=" . $dbpassword);

	if(!$dbc){
    die("Error in connection: " . pg_last_error());
	}else{
		echo "DB connected!";
	}

	// Write to db
	$sql = "INSERT INTO uninstalls(hs_user_id, hs_timestamp, hs_token) VALUES('" . $i . "', '" . $ts . "', '" . $token . "')";

	echo $sql;
	$result = pg_query($dbc, $sql);

	if (!$result) {
	  die("Error in SQL query: " . pg_last_error());
	}

	// free memory
	pg_free_result($result);

	// close connection
	pg_close($dbc);
?>

<!DOCTYPE html>
<html>
<head>
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script type="text/javascript" src="js/sha512.js"></script>
  <script src="https://d2l6uygi1pgnys.cloudfront.net/jsapi/2-0/hsp.js"></script>
</head>
<body>
	<script type="text/javascript">
		localStorage.removeItem('slack_access_token');
		localStorage.removeItem('slack_team_name');
		localStorage.removeItem('pid');
	</script>
</body>
</html>
