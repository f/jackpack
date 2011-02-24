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
			this.router.addRoute('/error', 'App.Controller.Error', 'index');

			this.router.addRoute('#DEFAULT#', 'App.Controller.Index', 'index');
			this.router.addRoute('#NOT_FOUND#', 'App.Controller.Error', 'index');
		},

		setupLayout: function()
		{
			Jack.Registry.set('App.Layout', $('div.main'));
		}
	});

})(jQuery);