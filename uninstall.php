<?php
	require_once('db-connection-creds.php');

	// $i = $_POST['i'];
	// $ts = $_POST['ts'];
	// $token = $_POST['token'];
	


	// $myfile = fopen("uninstall_list.csv", "w") or die("Unable to open file!");
	// $headers = "hs_member_id,timestamp,token";
	// fwrite($myfile, $headers);
	// $txt = $i . "," . $ts . "," . $token;
	// fwrite($myfile, $txt);
	// fclose($myfile);

	echo "HOST: " . $dbhost;
	echo "DBNAME: " . $dbname;
	echo "DBUSER: " . $dbuser;
	echo "PASSWORD: " . $dbpassword;
	// Connect to db
	$dbc = pg_connect("host=" . $dbhost . " dbname=" . $dbname . " user=" . $dbuser . " password=" . $dbpassword);

	if(!$dbc){
    die("Error in connection: " . pg_last_error());
	}else{
		echo "DB connected!";
	}

	// Write to db
	// $sql = "SELECT * FROM Countries";
	// $result = pg_query($dbc, $sql);

	// if (!$result) {
	//   die("Error in SQL query: " . pg_last_error());
	// }

	// // free memory
	// pg_free_result($result);

	// close connection
	pg_close($dbc);
?>