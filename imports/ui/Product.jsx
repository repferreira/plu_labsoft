import React, { Component, PropTypes } from 'react';
 
// Task component - represents a single todo item
export default class Product extends Component {
  render() {
    return (
      <li>{this.props.product.idProduto}: {this.props.product.nome} - R${(this.props.product.valor/100).toFixed(2)}</li>
    );
  }
}
 
Product.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  product: PropTypes.object.isRequired,
};