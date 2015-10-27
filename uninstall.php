
		<?php

		$memberId = $_POST['member_id'];
		$userId = $_POST['user_id'];
		$i = $_POST['i'];
		$token = $_POST['token'];
		$time_stamp = $_POST['time_stamp'];
		$ts = $_POST['ts'];


		$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
		$txt = $userId + " - USER \n";
		fwrite($myfile, $txt);
		$txt = $memberId + " - MEMBER \n";
		fwrite($myfile, $txt);
		$txt = $i + " - I \n";
		fwrite($myfile, $txt);
		$txt = $token + " - TOKEN \n";
		fwrite($myfile, $txt);
		$txt = $time_stamp + " - time_stamp \n";
		fwrite($myfile, $txt);
		$txt = $ts + " - ts \n";
		fwrite($myfile, $txt);
		$txt = "TEST3";
		fwrite($myfile, $txt);
		fclose($myfile);


		?>


