(function($) {

	Jack.use(
		'Jack.Model'
	);

	PROJECT.Model.MODEL = function() {

		this.field1 = null;
		this.field2 = null;
		this.field3 = null;

	};
	PROJECT.Model.MODEL.prototype = Jack.extend(Jack.Model, {

		Mapper : {

			result : [],

			getAll : function() {

				//TODO: implement getting all data

			}
		}

	});

})(jQuery);