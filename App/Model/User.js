(function($) {

	Jack.use(
		'Jack.Model'
	);

	App.Model.User = function(){
		this.name = null;
		this.surname = null;
	};
	App.Model.User.prototype = $.extend(Jack.Model, {

	});

})(jQuery);