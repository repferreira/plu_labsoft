import { Meteor } from 'meteor/meteor';

import { Products } from '../imports/api/products.js';

Meteor.startup(() => {
  // code to run on server at startup

	Meteor.method("produto", function(id) {
		var product = Products.findOne({idProduto: parseInt(id, 10)});
		return {
			idProduto: product.idProduto,
			nome: product.nome,
			valor: product.valor
		};
	}, {
		url: "produto/:0",
		httpMethod: "get"
	});

  
});
