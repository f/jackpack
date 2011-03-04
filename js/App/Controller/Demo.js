(function($) {

	Jack.use(
		'Jack.Controller',
		'Jack.View',
		'App.Model.Person'
	);

	App.Controller.Demo = function() {
		this.view = new Jack.View();
		this.layout = Jack.Registry.get('App.Layout');
	};
	App.Controller.Demo.prototype = Jack.extend(Jack.Controller, {

		indexAction : function() {

			var self = this;
			this.view.assign({
				people : Jack.getInstance('App.Model.Person').storage
			});
			this.view.render('demo', function(data) {
				self.layout.html(data);
				this.layoutLoaded = true;
			});
		},

		addAction : function()
		{
			var self = this;
			if (!this.layoutLoaded)
				this.indexAction();

			this.view.render('demo.add', function(data) {
				self.layout.find('#actions').hide().html(data).slideDown();
			});
		},

		deleteAction : function(params) {

			App.Controller.Demo.del(params.id);
			this.indexAction();
		}

	});
	App.Controller.Demo.add = function(data) {

		var person = Jack.newInstance('App.Model.Person');
		var row = $('<tr/>');
		_(data).each(function(input) {
			person[input.name] = input.value;
			row.append($('<td/>').text(input.value));
		});
		row.append($('<td/>').append($('<button/>', {type: 'text'}).text('Delete').click(function() {
			Jack.go('/demo/delete/' + person.phone.replace(/\D/g,''))
		})));

		//temporary storage
		App.Model.Person.storage.push(person);

		$('#list tbody').append(row);

	};
	App.Controller.Demo.del = function(phone) {

		for (var index in App.Model.Person.storage)
		{
			if (App.Model.Person.storage[index].phone.replace(/\D/g, '') == phone)
			{
				delete App.Model.Person.storage[index];
				$('#list tbody tr').each(function() {
					if ($(this).find('td:eq(2)').text().replace(/\D/g, '') == phone)
					{
						$(this).remove();
					}
				});
			}
		}



	};

})(jQuery);