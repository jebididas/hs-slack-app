<?php
	require("db-connection-creds.php");

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