(function (app, Router) {

	'use strict';

	var routes = {
		'/all': function() {
			todosApp.filterFlag = 'all';
		},
		'/incompleted': function() {
			todosApp.filterFlag = 'incompleted';
		},
		'/completed': function() {
			todosApp.filterFlag = 'completed';
		}
	};

	var options = {
		notfound: function() {
			window.location.hash = '';
			todosApp.filterFlag = 'all';
		}
		// ,html5history: true
	}
	var router = new Router(routes);
	router.configure(options);
	router.init();

})(todosApp, Router);
