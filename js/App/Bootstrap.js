(function($){

	/**
	 * Loading required classes.
	 */
	Jack.use(
		'Jack.Bootstrap',
		'Jack.View',
		'Jack.Router',
		'Jack.Util.Ajax'
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
			this._init();
			this.setupRoutes();
			this.setupView();
			this.setupLayout();

			//when everything is ready, lets route.
			this.router.listen();
		},

		/**
		 * Creating routes using XRegExp
		 */
		setupRoutes: function()
		{
			this.router = new Jack.Router;
			this.router.addRoute('/(index|home)?', 'App.Controller.Index.index');
			this.router.addRoute('/live', 'App.Controller.GitLive.index');

			this.router.addRoute('/error/(?<code>[0-9]+)', 'App.Controller.Error.index');
			this.router.addRoute(Jack.Router.DEFAULT, 'App.Controller.Index.index');
			this.router.addRoute(Jack.Router.ERROR, 'App.Controller.Error.index');
		},

		setupView : function()
		{
			Jack.View.setBasePath(Jack.getBasePath() + 'App/View');
		},

		setupLayout: function()
		{
			var layout = $('div.content');
			/*layout.ajaxStart(function() {
				$(this).html('Loading...');
			});*/

			//handle document.write
			Jack.Util.Ajax.overloadDocumentWrite();
			//set default container as layout.
			Jack.Util.Ajax.setDocumentWriteContainer(layout);


			Jack.Registry.set('App.Layout', layout);
		}
	});

})(jQuery);