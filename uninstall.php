

<!DOCTYPE html>
<html>
<head>
	<title>Uninstall</title>
	<script type="text/javascript">

		<?php

		$memberId = $_REQUEST['member_id'];
		$userId = $_REQUEST['user_id'];

		function debug_to_console( $data ) {

		    if ( is_array( $data ) )
		        $output = "<script>console.log( 'Debug Objects: " . implode( ',', $data) . "' );</script>";
		    else
		        $output = "<script>console.log( 'Debug Objects: " . $data . "' );</script>";

		    echo $output;
		}

		debug_to_console( "Member ID: " + $memberId );
		debug_to_console( "User ID: " + $userId );

		?>


	</script>
</head>
<body>

</body>
</html>

