<?php

	$i = $_POST['i'];
	$ts = $_POST['ts'];
	$token = $_POST['token'];
	


	$myfile = fopen("uninstall_list.csv", "w") or die("Unable to open file!");
	$headers = "hs_member_id,timestamp,token";
	fwrite($myfile, $headers);
	$txt = $i + "," + $ts + "," + $token;
	fwrite($myfile, $txt);
	fclose($myfile);

?>


