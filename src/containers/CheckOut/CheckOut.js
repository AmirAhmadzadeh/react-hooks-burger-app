import React  from 'react'

import CheckOutSummery from '../../components/Order/CheckOutSummery/CheckOutSummery';

import { Route, Redirect } from 'react-router-dom';

import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';


 

function CheckOut(props) {

  const continueHandler = () => {
    props.history.replace('/checkout/contact-data');
  }

  const cancelHandler = () => {
    props.history.goBack();
  }

  let redirectIfisEmpty = null;
  
  if (Object.keys(props.ings).length === 0) {
    redirectIfisEmpty = <Redirect to="/" />
  }

  return (
    <React.Fragment>
      {redirectIfisEmpty}
      <CheckOutSummery
        ingredients={props.ings}
        cancel={cancelHandler}
        continue={continueHandler}
      />
      <Route path="/checkout/contact-data" component={ContactData} />

    </React.Fragment>
  )
}

const mapStatesToProps = state => {

  return {
    ings: state.burgerBuilder.ings
  }
}



export default connect(mapStatesToProps)(CheckOut);

