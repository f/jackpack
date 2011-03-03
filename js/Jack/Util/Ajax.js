(function($) {

	Jack.Util.Ajax = {

		documentWrite : function()
		{
			for (var index in arguments) {
				$(document.writeContainer).append(arguments[index]);
			}
		},

		setDocumentWriteContainer : function(element)
		{
			document.writeContainer = element;
		},

		overloadDocumentWrite : function()
		{
			if (!document.writeContainer)
				document.writeContainer = [$(document.body)]; //sorry :(

			document.write = Jack.Util.Ajax.documentWrite;
			document.write.into = function(element)
			{
				Jack.Util.Ajax.setDocumentWriteContainer($(element));
			}
		}

	};

})(jQuery);