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
		<!-- api -->
		<script src="app/components/api/api.spec.js"></script>
		<script src="app/components/api/api.routes.constant.js"></script>
		<script src="app/components/api/api.constant.js"></script>
		<script src="app/components/api/api.factory.js"></script>


	<!-- Schedule -->
		<script src="app/components/schedule/schedule.spec.js"></script>
		<script src="app/components/schedule/schedule.factory.js"></script>


	<!-- Places -->
		<!-- Activities -->
		<script src="app/places/activities/activities.spec.js"></script>
		<script src="app/places/activities/activities.controller.js"></script>
		<!-- Activity Sessions -->
		<script src="app/places/activitysessions/activitysessions.spec.js"></script>
		<script src="app/places/activitysessions/activitysessions.controller.js"></script>

	<script src="app/places/places.js"></script>

	<!-- App -->
	<script src="app/app.js"></script>

</body>
</html>
