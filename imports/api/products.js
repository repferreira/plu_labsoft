import { Mongo } from 'meteor/mongo';
 
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
		}
	});
}