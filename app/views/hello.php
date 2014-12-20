<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>UTSC Drop-in Schedule</title>

	<!-- CSS -->
	<link href="bower_components/toastr/toastr.css" rel="stylesheet" />

</head>
<body ng-app="app.main">

	<div ui-view></div>

	<!-- Vendor -->
	<script src="bower_components/jquery/dist/jquery.js"></script>
	<script src="bower_components/angular/angular.js"></script>
	<script src="bower_components/ui-router/release/angular-ui-router.js"></script>
	<script src="bower_components/toastr/toastr.js"></script>

	<!-- Utilities -->
		<!-- api -->
		<script src="app/utilities/api/api.module.js"></script>
		<script src="app/utilities/api/api.routes.constant.js"></script>
		<script src="app/utilities/api/api.constant.js"></script>
		<script src="app/utilities/api/api.factory.js"></script>
		<!-- logger -->
		<script src="app/utilities/logger/logger.module.js"></script>
		<script src="app/utilities/logger/logger.factory.js"></script>
		<!-- exception -->
		<script src="app/utilities/exception/exception.module.js"></script>
		<script src="app/utilities/exception/exception.factory.js"></script>
		<script src="app/utilities/exception/exception-handler.provider.js"></script>

	<!-- Core -->
	<script src="app/core/core.module.js"></script>
	<script src="app/core/core.config.js"></script>
	<script src="app/core/core.constant.js"></script>

	<!-- Schedule -->
		<script src="app/components/schedule/schedule.module.js"></script>
		<script src="app/components/schedule/schedule.factory.js"></script>

	<!-- Layout -->
		<script src="app/layout/shell.controller.js"></script>

	<!-- Places -->
		<!-- Activities -->
		<script src="app/places/activities/activities.module.js"></script>
		<script src="app/places/activities/activities.controller.js"></script>
		<script src="app/places/activities/activities.data.factory.js"></script>

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
