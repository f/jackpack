(function($) {

	Jack.Model = {

		sendServer: function(url, data, callback, type)
		{
			var params = new Object();
			if (this != window)
				for (var param_name in this)
					if (_(['string', 'number', 'boolean']).indexOf($.type(this[param_name])) > -1)
						params[param_name] = this[param_name];

			data = $.extend(params, data);

			$.post(url, data, callback, type);
		}

	}

})(jQuery);