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
			/*Jack.use('App.Model.User');

			var user = new App.Model.User;
			var view = this.view;
			user.name = 'fatih';
			user.surname = 'akin';
			user.sendServer('test.php', {cmd: 'add'}, function(data) {
				data = view.renderString(data);
				alert(data);
			});*/

			var self = this;
			this.view.renderServer('test.php', {adi:'fatih'}, function(data){
				self.layout.html(data);
			});
		}

	});

})(jQuery);