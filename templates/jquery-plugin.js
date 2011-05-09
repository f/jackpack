(function($) {

	Jack.use(
		'Jack.Plugin'
	);

	Jack.Plugin.register.jQuery('@PLUGIN@', function(elements) {

		alert(this.length + ' elements found.');

	});

})(jQuery);
