import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/ BurgerBuilder';
import {Switch , Route } from 'react-router-dom';
import Checkout from './containers/CheckOut/CheckOut';



class App extends Component {
  render() {
    return (
        <Layout>
           <Switch>

              <Route path="/" exact component={BurgerBuilder}/>

              <Route path="/checkout" exact  component={Checkout}/>



           </Switch>

        </Layout>
     
    );
  }
}

export default App;
