(function($) {

	Jack.use(
		'Jack.Controller',
		'Jack.View'
	);

	App.Controller.Error = function() {
		this.view = new Jack.View();
	};
	App.Controller.Error.prototype = Jack.extend(Jack.Controller, {

		indexAction : function(params)
		{
			alert('error occured ' + params.code);
		}

	});

})(jQuery);