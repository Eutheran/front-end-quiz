import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import SingleProductView from './components/singleProductView';
import AllProductsView from './components/allProductsView';

export default class Router extends Component {
  render() {
    return (
      <div id="routePaths">
        <Route exact path="/" render={() => <Redirect to="/browse" />} />
        <Route exact path="/browse/item/:id" component={SingleProductView} />
        <Route exact path="/browse" component={AllProductsView} />
      </div>
    );
  }
}
