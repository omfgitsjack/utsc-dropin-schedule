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
		<script src="app/components/api/api.module.js"></script>
		<script src="app/components/api/api.routes.constant.js"></script>
		<script src="app/components/api/api.constant.js"></script>
		<script src="app/components/api/api.factory.js"></script>

	<!-- Schedule -->
		<script src="app/components/schedule/schedule.module.js"></script>
		<script src="app/components/schedule/schedule.factory.js"></script>

	<!-- Layout -->
		<script src="app/layout/shell.controller.js"></script>

	<!-- Places -->
		<!-- Activities -->
		<script src="app/places/activities/activities.module.js"></script>
		<script src="app/places/activities/activities.controller.js"></script>
		<!-- Activity Sessions -->
		<script src="app/places/activitysessions/activitysessions.module.js"></script>
		<script src="app/places/activitysessions/activitysessions.controller.js"></script>

	<!-- App routes -->
	<script src="app/routes.module.js"></script>
	<script src="app/routes.config.js"></script>


	<!-- App -->
	<script src="app/app.module.js"></script>

</body>
</html>
