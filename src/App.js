import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/ BurgerBuilder';
import { Route } from 'react-router-dom';
import Checkout from './containers/CheckOut/CheckOut';
import Aux from './hoc/Aux' ;
import Orders from './containers/Orders/Orders' ; 
import ErrorComponent from './components/Error/Error'
import Auth from './containers/Auth/Auth'


 class App extends Component {
  render() {
    return (
    
         <Aux>
          <Layout>                       
              <Route path="/" exact component={BurgerBuilder}/>
              <Route path="/checkout"  component={Checkout}/>
              <Route path="/orders"  component={Orders} /> 
              <Route path="/auth" component={Auth} />
              <Route path="/error" component={ErrorComponent} />
          </Layout>
       </Aux>
    )
  }
}


export default App;
