<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>UTSC Drop-in Schedule</title>

	<!-- CSS -->

</head>
<body ng-app="app.main">

	<div ui-view></div>

	<!-- Bower Components -->
	<script src="bower_components/angular/angular.js"></script>
	<script src="bower_components/ui-router/release/angular-ui-router.js"></script>

	<!-- Components -->
		<!-- Schedule -->
		<script src="app/components/schedule/schedule.spec.js"></script>
		<script src="app/components/schedule/schedule.factory.js"></script>


	<!-- Places -->
		<!-- Activities -->
		<script src="app/places/activities/activities.spec.js"></script>
		<script src="app/places/activities/ActivityCtrl.js"></script>
	<script src="app/places/places.js"></script>

	<!-- App -->
	<script src="app/app.js"></script>

</body>
</html>
