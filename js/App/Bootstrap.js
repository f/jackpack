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
	App.Bootstrap = $.extend(Jack.Bootstrap, {

		/**
		 * Initializing...
		 */
		init: function()
		{
			this.setupRoutes();
		},

		/**
		 * Creating routes using XRegExp
		 */
		setupRoutes: function()
		{
			this.router = new Jack.Router;
			this.router.addRoute('/fatih/(?<id>[0-9]+)', 'App.Controller.Index', 'index');
			this.router.listen();
		}
	});

})(jQuery);