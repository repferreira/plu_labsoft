import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Products = new Mongo.Collection('products');
export const Categories = new Mongo.Collection('categories');

if(Meteor.isServer) {
	Meteor.publish('products', function productsPublication() {
		return Products.find();
	});
	
	Meteor.publish('categories', function categoriesPublication() {
		return Categories.find();
	});

	Meteor.methods({
		'products.insert'(idProduto, nome, valor, marca, categoria, imagem) {
			check(idProduto, Number);
			check(nome, String);
			check(valor, Number);
			check(marca, String);
			check(categoria, String);
			check(imagem, String);

			var sameIdProducts = Products.find({idProduto: idProduto}).fetch();
			if(sameIdProducts.length > 0)
				return;

			Products.insert({
				idProduto,
				nome,
				valor,
				marca,
				categoria,
				imagem,
				createdAt: new Date(),
			});
		},
	});
}