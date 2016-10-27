import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Products = new Mongo.Collection('products');

if(Meteor.isServer) {
	Meteor.publish('products', function productsPublication() {
		return Products.find();
	});

	Meteor.methods({
		'products.insert'(idProduto, nome, valor) {
			check(idProduto, Number);
			check(nome, String);
			check(valor, Number);

			var sameIdProducts = Products.find({idProduto: idProduto}).fetch();
			if(sameIdProducts.length > 0)
				return;

			Products.insert({
				idProduto,
				nome,
				valor,
				createdAt: new Date(),
			});
		},
	});
}