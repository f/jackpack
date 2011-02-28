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

			var self = this;
			var commits = Jack.newInstance('App.Model.GitCommit');
			var commitArray = [];

			commits.Mapper.onComplete(function() {
				self.view.assign({commits: commitArray});
				self.view.render('gitlive', function(data) {
					self.layout.html(data);
				});
			});

			commits.Mapper.getAll(function(i, data){
				commitArray.push(data);
			});

		}

	});

})(jQuery);