import React, { Component } from 'react'
import CheckOutSummery from '../../components/Order/CheckOutSummery/CheckOutSummery';
import Aux from '../../hoc/Aux';
import { Route , Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';


class CheckOut extends Component {



  continueHandler = () => {

    this.props.history.replace('/checkout/contact-data');
  }


  cancelHandler = () => {

    this.props.history.goBack();
  }




  render() {
    let redirectIfisEmpty = null;
    if (Object.keys(this.props.ings).length === 0) {
      redirectIfisEmpty = <Redirect to="/" />
    }


    return (
      <Aux>
        {redirectIfisEmpty}
        <CheckOutSummery
          ingredients={this.props.ings}
          cancel={this.cancelHandler}
          continue={this.continueHandler}
        />
      <Route path="/checkout/contact-data" component={ContactData} /> 

      </Aux>
    )
  }
}




const mapStatesToProps = state => {

  return {
    ings: state.burgerBuilder.ings 
  }
}



export default connect(mapStatesToProps)(CheckOut);

