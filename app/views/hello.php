<!doctype html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" href="assets/brand/favicon.ico">

	<title>UTSC Drop-in Schedule</title>

	<!-- Fonts -->
	<link href='http://fonts.googleapis.com/css?family=Raleway:400,300,600' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Fira+Sans:400,300' rel='stylesheet' type='text/css'>

	<!-- Icons -->
	<link href='http://code.ionicframework.com/ionicons/2.0.0/css/ionicons.min.css' rel='stylesheet' type='text/css'>

	<!-- CSS -->
	<link href="bower_components/toastr/toastr.css" rel="stylesheet" />
	<link rel="stylesheet" href="bower_components/angular-material/angular-material.css">
	<link rel="stylesheet" href="css/Skeleton-2.0.2/css/normalize.css">
	<link rel="stylesheet" href="css/Skeleton-2.0.2/css/skeleton.css">
	<link rel="stylesheet" href="css/Bootstrap-tooltip/bootstrap-tooltip.css">
	<link rel="stylesheet" href="build/app.css">


</head>
<body ng-app="app.main">

	<div ng-show="loadingData" class="loading-spinner">
		<md-progress-circular md-mode="indeterminate"></md-progress-circular>
	</div>

	<div ui-view></div>

	<footer>
		<p class="text-muted">Follow us on:</p>
		<div class="social-media">
			<a href="https://www.facebook.com/UTSCJustPlay">
				<img class="icon" src="assets/icons/FB-f-Logo__blue_50.png" alt="Facebook"/>
			</a>
			<a href="https://www.twitter.com/justplayca">
				<img class="icon" src="assets/icons/twitter.png" alt="Facebook"/>
			</a>
		</div>
		<p class="text-muted small-text">Disclaimer: We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with UTSC Department of Atheltics & Recreation, or any of its subsidiaries or its affiliates.</p>
	</footer>

	<!-- Vendor Js -->
	<script src="build/vendor.js"></script>

	<!-- App -->
	<script src="build/app.js"></script>

</body>
</html>