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

			getAll : function()
			{
				var result = [];
				$.getJSON('http://github.com/api/v2/json/commits/list/fkadeveloper/jackpack/master?page=1', null, function(response) {

					response = response||{commits:[]};
					var _commit;
					for (var commit in response.commits)
					{
						_commit = Jack.newInstance('App.Model.GitCommit');
						_commit.committer = commit.committer.name;
						_commit.url = commit.url;
						_commit.message = commit.message;
						_commit.committed_date = commit.committed_date;
						result.push(_commit);
					}

				});
				return result;
			}

		}

	});

})(jQuery);