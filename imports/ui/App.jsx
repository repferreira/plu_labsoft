import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Products } from '../api/products.js';

import Product from './Product.jsx';
 
// App component - represents the whole app
export default class App extends Component {

  handleSubmit(event) {
    event.preventDefault();

    const id = parseInt(ReactDOM.findDOMNode(this.refs.id).value.trim(), 10);
    const nome = ReactDOM.findDOMNode(this.refs.nome).value.trim();
    const valor = parseInt(ReactDOM.findDOMNode(this.refs.price).value.trim(), 10);
    const marca = ReactDOM.findDOMNode(this.refs.marca).value.trim();

    if(!isNaN(id) && nome.length > 0 && !isNaN(valor) && marca.length > 0)
      Meteor.call('products.insert', id, nome, valor);

    // Clear form
    ReactDOM.findDOMNode(this.refs.id).value = '';
    ReactDOM.findDOMNode(this.refs.nome).value = '';
    ReactDOM.findDOMNode(this.refs.price).value = '';
    ReactDOM.findDOMNode(this.refs.marca).value = '';
  }
 
  renderProducts() {
    return this.props.products.map((product) => (
      <Product key={product._id} product={product} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        
        <body className="body page-cadastroproducto clearfix">
          <div className="background">
            <form className="cadastroproducto" onSubmit={this.handleSubmit.bind(this)} >

              <p className="text text-6">Cadastro de Produto</p>

              <input ref="id" className="_input _input-1" placeholder="ID" type="text" />
              <input ref="nome" className="_input _input-5" placeholder="Nome" type="text" />
              <input ref="marca" className="_input _input-3" placeholder="Marca" type="text" />
              <input ref="price" className="_input _input-4" placeholder="Preço" type="text" />
              <select ref="categoria" className="_select" name="Categoria">
                <option value="Escolha categoria">Categoria 1</option>
                <option value="Escolha categoria">Categoria 2</option>
              </select>
              <input ref="imagem" className="_input _input-2" placeholder="Escola a imagem" type="text" />

              <input type="submit" value="Cadastrar" className="_button" />

              <div className="containerdeprodutos">
                {this.renderProducts()}
              </div>

            </form>
          </div>
        </body>

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