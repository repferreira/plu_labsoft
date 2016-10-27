import React, { Component, PropTypes } from 'react';
 
// Task component - represents a single todo item
export default class Product extends Component {
  render() {
    return (
    	<div className="produto">
          <p className="text text-1">{this.props.product.idProduto}</p>
          <p className="text text-2">Categoria 1</p>
          <p className="text text-3">R${(this.props.product.valor/100).toFixed(2)}</p>
          <p className="text text-4">Marca 1</p>
          <p className="text text-5">{this.props.product.nome}</p>
        </div>
    );
  }
}
 
Product.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  product: PropTypes.object.isRequired,
};