(function($) {

	Jack.use(
		'Jack.Model'
	);

	App.Model.Person = function() {
		this.name = null;
		this.surname = null;
		this.phone = null;
	};
	App.Model.Person.storage = [];
	App.Model.Person.prototype = Jack.extend(Jack.Model, {

		Mapper : {

			result : [],

			getAll : function() {}
		}

	});

})(jQuery);