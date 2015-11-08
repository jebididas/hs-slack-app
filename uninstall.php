<?php
	require('db-connection-creds.php');
	$dbhost = "ec2-54-225-197-30.compute-1.amazonaws.com";
	$dbname = "d3md9j90sliij1";
	$dbuser = "xeudqrbivxcdbf";
	$dbpassword = "NnYwWvM2sHJlvZTOexjZajBIK6";

	$i = $_POST['i'];
	$ts = $_POST['ts'];
	$token = $_POST['token'];
	
	echo $i;
	echo $ts;
	echo $token;


	// $myfile = fopen("uninstall_list.csv", "w") or die("Unable to open file!");
	// $headers = "hs_member_id,timestamp,token";
	// fwrite($myfile, $headers);
	// $txt = $i . "," . $ts . "," . $token;
	// fwrite($myfile, $txt);
	// fclose($myfile);

	// Connect to db
	$dbc = pg_connect("host=" . $dbhost . " dbname=" . $dbname . " user=" . $dbuser . " password=" . $dbpassword);

	if(!$dbc){
    die("Error in connection: " . pg_last_error());
	}else{
		echo "DB connected!";
	}

	// Write to db
	$sql = 'INSERT INTO uninstalls (hs_user_id, timestamp, token) 
					VALUES("' . $i . '", "' . $ts . '", "' . $token . '")';			

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