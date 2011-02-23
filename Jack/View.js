(function($) {

	Jack.View = function()
	{
		this.vars = {};
	};
	//static
	Jack.View.templateCache = {};
	Jack.View.prototype = {

		assign: function(hash)
		{
			this.vars = $.extend(this.vars, hash);
		},

		render: function(view, onsuccess)
		{
			var self = this;

			if (Jack.View.templateCache[view])
			{
				onsuccess(_.template(Jack.View.templateCache[view], self.vars));
				return;
			}

			$.get('App/View/'+view+'.html', null, function(data) {
				Jack.View.templateCache[view] = data;
				onsuccess(_.template(data, self.vars));
			});
		},

		renderServer: function(server_route, data, onsuccess, method, type)
		{
			var self = this;

			if (!_(['post','get']).indexOf(method) > -1)
				method = 'post';

			$[method](server_route, data, function(data) {
				onsuccess(_.template(data, self.vars));
			}, type);

		},

		renderServerJSON: function(server_route, data, onsuccess, method)
		{
			this.renderServer(server_route, data, onsuccess, method, 'json');
		},

		renderString: function(string)
		{
			return _.template(string, this.vars);
		}

	}

})(jQuery);