(function($) {

	Jack.Router = function() {
		this.routes = {};
		this.hash = null;
		this.options = {
			prefix: '!'
		};
	};
	Jack.Router.prototype = {

		addRoute : function (route, controller, callback) {
			this.routes[route] = {'controller': controller, 'method': callback};
		},

		listen : function ()
		{
			var listener = this;
			if (listener.hash != window.location.hash)
				listener.dispatch(window.location.hash);

			if ('onhashchange' in window) {
				$(window).bind('hashchange', function() {
					listener.dispatch(window.location.hash);
				});
			} else {
				listener.hash = window.location.hash;
				$(document).ready(function() {
					setInterval(function() {
						if (window.location.hash != listener.hash) {
							listener.dispatch(window.location.hash);
							listener.hash = window.location.hash;
						}
					}, 100);
				});
			}
		},

		dispatch : function (hash) {

			if (hash == null)
				return;

			for (var route in this.routes) {

				var callback = this.routes[route];
				var controller = Jack.getInstance(callback['controller'], true);

				if (typeof controller[callback['method'] + 'Action'] != 'function')
					continue;

				var regex = XRegExp('^#' + this.options.prefix + route + '$', 'ui');

				var matches = regex.exec(hash);
				if (matches) {
					controller[callback['method'] + 'Action'](matches);
					break;
				}
			}
		}

	}

})(jQuery);