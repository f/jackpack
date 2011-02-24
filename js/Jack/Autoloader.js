(function($){

	/**
	 * Jack Autoloader Class
	 *
	 * Autoloads required javascript files using <script/> tag.
	 */
	Jack.Autoloader = {

		/**
		 * Loaded classes array.
		 */
		autoloaded: [],

		basePath: '',

		loadClass : function(class_names)
		{
			var self = Jack.Autoloader;

			for (var i=0; i<arguments.length; i++)
			{
				var class_name = arguments[i];

				if (_(self.autoloaded).indexOf(class_name) > -1)
					return;

				var class_route = class_name.replace(/\./g, '/');
				if (self.basePath.charAt(self.basePath.length-1) != '/')
					self.basePath+='/';

				var class_path = self.basePath+class_route + '.js';
				var script = $('<script/>', {type: 'text/javascript', src: class_path});
				$(document.body).append(script);

				self.autoloaded.push(class_name);
				self.autoloaded = _.uniq(self.autoloaded);

			}
		},

		setBasePath: function(base) {
			this.basePath = base;
		}
	}

})(jQuery);