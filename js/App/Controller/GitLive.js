//http://github.com/api/v2/json/commits/list/fkadeveloper/jackpack/master
(function($) {

	Jack.use(
			'Jack.Controller',
			'Jack.View',
			'App.Model.GitCommit'
			);

	App.Controller.GitLive = function() {
		this.view = new Jack.View();
		this.layout = Jack.Registry.get('App.Layout');
	};
	App.Controller.GitLive.prototype = Jack.extend(Jack.Controller, {

		indexAction : function(params) {

			var commits = Jack.newInstance('App.Model.GitCommit');

			console.log(commits.Mapper.getAll());

			var self = this;
			this.view.render('index', function(data) {
				self.layout.html(data);
			});
		}

	});

})(jQuery);