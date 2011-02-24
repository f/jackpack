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

		run: function(callback, parameters)
		{
			if (typeof callback != 'object')
				return false;

			var controller = Jack.newInstance(callback['controller']);
			if (typeof controller[callback['method'] + 'Action'] != 'function')
				return false;

			controller[callback['method'] + 'Action'](parameters||{});
			return true;
		},

		dispatch : function (hash) {

			for (var route in this.routes) {

				var regex = XRegExp('^#' + this.options.prefix + route + '$', 'ui');

				if (regex.test(hash)) {
					this.run(this.routes[route], regex.exec(hash));
					return;
				}
			}

			//if hash is null or empty then it is default, if not, it is a 404 page.
			if (_([null, '']).indexOf($.trim(hash)) > -1)
			{
				if (_(this.routes).chain().keys().indexOf('#DEFAULT#').value() > -1)
				{
					this.run(this.routes['#DEFAULT#']);
				}
			} else {
				if (_(this.routes).chain().keys().indexOf('#NOT_FOUND#').value() > -1)
				{
					this.run(this.routes['#NOT_FOUND#'], {code: 404});
				}
			}
		}

	}

})(jQuery);