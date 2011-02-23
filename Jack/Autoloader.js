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

		loadClass : function(class_names)
		{
			var self = Jack.Autoloader;

			for (var i=0; i<arguments.length; i++)
			{
				var class_name = arguments[i];

				if (_(self.autoloaded).indexOf(class_name) > -1)
					return;

				var class_route = class_name.replace(/\./g, '/');
				var class_path = class_route + '.js';
				var script = $('<script/>', {type: 'text/javascript', src: class_path});
				$(document.body).append(script);

				self.autoloaded.push(class_name);
				self.autoloaded = _.uniq(self.autoloaded);

			}
		}
	}

})(jQuery);