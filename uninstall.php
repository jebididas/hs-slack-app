
		<?php

		$i = $_POST['i'];
		$token = $_POST['token'];
		$ts = $_POST['ts'];


		$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
		$txt = $i + "\n";
		fwrite($myfile, $txt);
		$txt = $token + "\n";
		fwrite($myfile, $txt);
		$txt = $ts + "\n";
		fwrite($myfile, $txt);
		fclose($myfile);


		?>


