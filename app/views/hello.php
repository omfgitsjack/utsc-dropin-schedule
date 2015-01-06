<!doctype html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta charset="utf-8">
	<meta name="Description" content="Easily browse UTSC's Drop-in Schedule and find people to play with">
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
	<link rel="stylesheet" href="build/vendor.css">
	<link rel="stylesheet" href="build/app.css">

</head>
<body ng-app="app.main">

	<div ng-show="loadingData" class="loading-spinner">
		<md-progress-circular md-mode="indeterminate"></md-progress-circular>
	</div>

	<div ui-view></div>

	<!-- Vendor Js -->
	<script src="build/vendor.js"></script>

	<!-- App -->
	<script src="build/app.js"></script>

</body>
</html>