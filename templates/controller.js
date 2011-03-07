(function($) {

	Jack.use(
		'Jack.Controller',
		'Jack.View'
	);

	PROJECT.Controller.CONTROLLER = function() {
		this.view = new Jack.View();
		this.layout = Jack.Registry.get('PROJECT.Layout');
	};
	PROJECT.Controller.CONTROLLER.prototype = Jack.extend(Jack.Controller, {

		indexAction : function(params) {
			var self = this;

			//TODO: implement controller index.
			this.view.assign({
				variable1: 'value',
				variable2: 'value'
			});

			this.view.render('index', function(data) {
				self.layout.html(data);
			});
		}

	});

})(jQuery);