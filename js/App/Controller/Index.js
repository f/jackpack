(function($){

	Jack.use(
		'Jack.Controller',
		'Jack.View'
	);

	App.Controller.Index = function()
	{
		this.view = new Jack.View();
	};
	App.Controller.Index.prototype = Jack.extend(Jack.Controller, {

		indexAction : function(params)
		{
			alert('index action run');
			//alert(Jack.Registry.get('App.Layout'));
			this.view.assign({id: params.id});
			this.view.render('test', function(data) {

				$('#test').html(data);

			});

			Jack.use('App.Model.User');

			var user = new App.Model.User;
			var view = this.view;
			user.name = 'fatih';
			user.surname = 'akin';
			user.sendServer('test.php', {cmd: 'add'}, function(data) {
				data = view.renderString(data);
				alert(data);
			});

			this.view.renderServer('test.php', {adi:'fatih'}, function(data){
				alert(data);
			});
		}

	});

})(jQuery);