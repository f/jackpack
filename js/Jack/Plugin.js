(function($){

	Jack.Plugin = function(name, constructor) {
		this.name = name;
		this.init = constructor;
	};
	Jack.Plugin.libraries = [];
	Jack.Plugin.register = {

		newLibrary : function(library, definer)
		{
			Jack.Plugin.libraries[library] = definer;
			Jack.Plugin.register[library] = function(name, constructor)
			{
				Jack.Plugin.register.library(library, name, constructor);
			}
		},

		library : function(library, name, constructor)
		{
			var plugin = new Jack.Plugin(name, constructor);
			plugin.bind(library);
		}

	};
	Jack.Plugin.prototype = {

		bind : function(library)
		{
			Jack.Plugin.libraries[library](this.name, this.init);
		}

	};

	//Register libraries.
	Jack.Plugin.register.newLibrary('jQuery', function(name, constructor) {

		$.fn[name] = constructor;

	});
	Jack.Plugin.register.newLibrary('underscore', function(name, constructor) {

		var mixin = {};
		mixin[name] = constructor;
		_.mixin(mixin);

	});

})(jQuery);