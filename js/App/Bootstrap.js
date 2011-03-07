(function($){

	//Creating app namespace object
	App = {
		Model : {},
		View : {},
		Controller : {}
	};
	window.App = App;

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
			this.router.addRoute('/demo', 'App.Controller.Demo.index');
			this.router.addRoute('/demo/add', 'App.Controller.Demo.add');
			this.router.addRoute('/demo/edit/(?<id>[0-9]+)', 'App.Controller.Demo.edit');
			this.router.addRoute('/demo/delete/(?<id>[0-9]+)', 'App.Controller.Demo.delete');

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