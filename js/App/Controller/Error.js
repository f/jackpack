(function($) {

	Jack.use(
		'Jack.Controller',
		'Jack.View'
	);

	App.Controller.Error = function() {
		this.view = new Jack.View();
		this.layout = Jack.Registry.get('App.Layout');
	};
	App.Controller.Error.prototype = Jack.extend(Jack.Controller, {

		indexAction : function(params)
		{
			this.view.assign({
				error: {
					code: params.code
				}
			});

			var self = this;
			this.view.render('error', function(data){
				self.layout.html(data);
			});
		}

	});

})(jQuery);