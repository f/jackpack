(function($){

	Jack.use(
		'Jack.Controller',
		'Jack.View'
	);

	App.Controller.Index = function()
	{
		this.view = new Jack.View();
		this.layout = Jack.Registry.get('App.Layout');
	};
	App.Controller.Index.prototype = Jack.extend(Jack.Controller, {

		indexAction : function(params)
		{
			var self = this;
			this.view.render('index', function(data){
				self.layout.html(data);
			});
		}

	});

})(jQuery);