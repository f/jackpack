(function($){

	//Creating application namespace object
	@PROJECT@ = {
		Model : {},
		View : {},
		Controller : {}
	};

	window.@PROJECT@ = @PROJECT@;

	Jack.use(
		'Jack.Bootstrap',
		'Jack.View',
		'Jack.Router',
		'Jack.Util.Ajax'
	);

	@PROJECT@.Bootstrap = Jack.extend(Jack.Bootstrap, {

		init: function()
		{
			this._init();
			this.setupRoutes();
			this.setupView();
			this.setupLayout();

			//when everything is ready, lets route.
			this.router.listen();
		},

		setupRoutes: function()
		{
			this.router = new Jack.Router;
			this.router.addRoute('/(index|home)?',      '@PROJECT@.Controller.Index.index');

			//Setting error and default views.
			this.router.addRoute(Jack.Router.DEFAULT,   '@PROJECT@.Controller.Index.index');
			this.router.addRoute(Jack.Router.ERROR,     '@PROJECT@.Controller.Error.index');
		},

		setupView : function()
		{
			Jack.View.setBasePath(Jack.getBasePath() + '@PROJECT@/View');
		},

		setupLayout: function()
		{
			var layout = $('div#jack-status');

			//handle document.write
			Jack.Util.Ajax.overloadDocumentWrite();
			//set default container as layout.
			Jack.Util.Ajax.setDocumentWriteContainer(layout);

			Jack.Registry.set('@PROJECT@.Layout', layout);
		}
	});

})(jQuery);
