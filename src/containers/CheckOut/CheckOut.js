

import React, { Component } from 'react'
import CheckOutSummery from '../../components/Order/CheckOutSummery/CheckOutSummery';
import classes from './CheckOut.css';
import Aux from '../../hoc/Aux';
import { Route } from 'react-router-dom' ;
import ContactData from './../../containers/CheckOut/ContactData/ContactData' ;


export default class CheckOut extends Component {


  state = {
    ingredients: {}
  }

  continueHandler = () => {
    
    this.props.history.replace('/checkout/catact-data');
  }
  cancelHandler = () => {

    this.props.history.goBack();
  }
  componentDidMount(){
    console.log('[in checkout]');
    const query = new URLSearchParams(this.props.location.search);   
    const ingredients = {}  ; 
    for(let param of query.entries()){   
      ingredients[param[0]]  = +param[1] ; 
    }   
    this.setState({ingredients});
  }

  render() {
    
    return (
      <Aux>
        <CheckOutSummery ingredients={this.state.ingredients} />
      
        <div className={classes.ButtonArea}>
          <div className={classes.Button} onClick={this.continueHandler}>continue</div>
          <div className={classes.Button} onClick={this.cancelHandler} >cancel</div>
        </div>


       <Route path="/checkout/contact-data" exact  component={ContactData}/>

      </Aux>
    )
  }
}


/*
  what's diffrent between forin and for of
*/