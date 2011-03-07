(function($){

	Jack.use(
		'Jack.Controller',
		'Jack.View'
	);

	PROJECT.Controller.Index = function()
	{
		this.view = new Jack.View();
		this.layout = Jack.Registry.get('PROJECT.Layout');
	};
	PROJECT.Controller.Index.prototype = Jack.extend(Jack.Controller, {

		indexAction : function()
		{
			var self = this;
			this.view.render('index', function(data){
				self.layout.html(data);
			});
		}

	});

})(jQuery);