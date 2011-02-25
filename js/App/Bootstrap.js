(function($){

	/**
	 * Loading required classes.
	 */
	Jack.use(
		'Jack.Bootstrap',
		'Jack.Router'
	);

	/**
	 * Bootstrap class
	 *
	 * Singleton
	 */
	App.Bootstrap = Jack.extend(Jack.Bootstrap, {

		/**
		 * Initializing...
		 */
		init: function()
		{
			this.setupRoutes();
			this.setupLayout();

			this.router.listen();
		},

		/**
		 * Creating routes using XRegExp
		 */
		setupRoutes: function()
		{
			this.router = new Jack.Router;
			this.router.addRoute('/(index|home)?', 'App.Controller.Index', 'index');
			this.router.addRoute('/live', 'App.Controller.GitLive', 'index');

			this.router.addRoute('/error/(?<code>[0-9]+)', 'App.Controller.Error', 'index');
			this.router.addRoute('#DEFAULT#', 'App.Controller.Index', 'index');
			this.router.addRoute('#NOT_FOUND#', 'App.Controller.Error', 'index');
		},

		setupLayout: function()
		{
			var layout = $('div.content');
			layout.ajaxStart(function() {
				$(this).html('Loading...');
			});

			Jack.Registry.set('App.Layout', layout);
		}
	});

})(jQuery);