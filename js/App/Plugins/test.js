(function($){

	Jack.use('Jack.Plugin');

	Jack.Plugin.register.jQuery('testPlugin', function(elements) {

		alert(this.length);

	});

})(jQuery);