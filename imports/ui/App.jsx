import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Products } from '../api/products.js';

import Product from './Product.jsx';
 
// App component - represents the whole app
export default class App extends Component {
 
  renderTasks() {
    return this.props.products.map((product) => (
      <Product key={product._id} product={product} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>
 
        <ul>
          {this.renderTasks()}
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
    products: Products.find().fetch(),
  };
}, App);