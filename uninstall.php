
		<?php

		$memberId = $_POST['member_id'];
		$userId = $_POST['user_id'];

		$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
		$txt = $userId + " - USER \n";
		fwrite($myfile, $txt);
		$txt = $memberId + " - MEMBER \n";
		fwrite($myfile, $txt);
		$txt = "TEST";
		fwrite($myfile, $txt);
		fclose($myfile);


		?>


