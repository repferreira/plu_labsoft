import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Products } from '../api/products.js';

import Product from './Product.jsx';
 
// App component - represents the whole app
export default class App extends Component {

  handleSubmit(event) {
    event.preventDefault();

    const id = parseInt(ReactDOM.findDOMNode(this.refs.idInput).value.trim(), 10);
    const nome = ReactDOM.findDOMNode(this.refs.nomeInput).value.trim();
    const valor = parseInt(ReactDOM.findDOMNode(this.refs.valorInput).value.trim(), 10);

    if(id && nome && valor)
      Meteor.call('products.insert', id, nome, valor);

    // Clear form
    ReactDOM.findDOMNode(this.refs.idInput).value = '';
    ReactDOM.findDOMNode(this.refs.nomeInput).value = '';
    ReactDOM.findDOMNode(this.refs.valorInput).value = '';
  }
 
  renderProducts() {
    return this.props.products.map((product) => (
      <Product key={product._id} product={product} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Produtos</h1>

          <form className="new-product" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="idInput"
              placeholder="ID"
            />
            <input
              type="text"
              ref="nomeInput"
              placeholder="Nome"
            />
            <input
              type="text"
              ref="valorInput"
              placeholder="Valor"
            />
            <input type="submit" value="Cadastrar" />
          </form>
        </header>
 
        <ul>
          {this.renderProducts()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  products: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('products');

  return {
    products: Products.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);