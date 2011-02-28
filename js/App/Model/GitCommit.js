(function($) {

	Jack.use(
		'Jack.Model'
	);

	App.Model.GitCommit = function(){
		this.committer = null;
		this.url = null;
		this.message = null;
		this.committed_date = null;
	};
	App.Model.GitCommit.prototype = Jack.extend(Jack.Model, {

		Mapper : {

			result : [],

			getAll : function(callback)
			{
				var self = this;
				$.getJSON('http://github.com/api/v2/json/commits/list/fkadeveloper/jackpack/master?page=1&callback=?', function(response) {

					response = response||{commits:[]};

					var _commit;
					for (var index in response.commits)
					{
						var commit = response.commits[index];
						_commit = Jack.newInstance('App.Model.GitCommit');
						_commit.committer = commit.committer.name;
						_commit.url = commit.url;
						_commit.message = commit.message;
						_commit.committed_date = commit.committed_date;
						callback(index, _commit);
					}
					self.oncomplete();

				});
			},

			onComplete : function(callback)
			{
				this.oncomplete = callback;
			}
		}

	});

})(jQuery);