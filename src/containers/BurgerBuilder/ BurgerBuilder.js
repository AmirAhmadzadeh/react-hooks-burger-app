import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from './../../components/Burger/Burger';
import BurgerBuildController from '../../components/Burger/BuildBurgerControll/BuildBurgerControll';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummery from './../../components/Burger/Ordersummery/Ordersummery';
import Spinner from './../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from './../../store/actions/index';
import { Redirect } from 'react-router-dom';

class BurgerBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = {

      loading: false,
      purchasing: false

    }

  }

  componentWillMount() {

    this.props.initIngredients();
    console.log(`[in componentWillMount]`, this.props.ings);
  }

  updatePurchase = (ingredients) => {


    const sum = Object.keys(ingredients).map(igkey => {
      return ingredients[igkey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);

    return sum > 0

  }



  purchaseHandler = () => {

    this.setState({
      purchasing: true
    });
  }

  purchaseCancelHandler = () => {

    this.setState({
      purchasing: false
    });
  }


  purchaseContinueHandler = () => {

    this.props.history.push('/checkout');
  }


  render() {

    const disabledInfo = {
      ...this.props.ings
    };

    for (let item in disabledInfo) {

      disabledInfo[item] = disabledInfo[item] <= 0 ? true : false;
    }

    let rolledMessage = null;

    let ordersummary = (

      <OrderSummery
        continueProcess={this.purchaseContinueHandler}
        cancelProcess={this.purchaseCancelHandler}
        ingrideints={this.props.ings}
        totalPrice={this.props.totalPrice}
      />
    );

    if (this.state.loading) ordersummary = <Spinner />;

    else if (this.state.enrollerdRequest) rolledMessage = <p>thanks for youre choice </p>;



    return (
      <div>
        {this.props.error ? <Redirect to="/error" /> :
         <Aux>
          <Modal show={this.state.purchasing}
            closeModal={this.purchaseCancelHandler}
          >
            {ordersummary}
            {rolledMessage}
          </Modal>
          <Burger ingredients={this.props.ings} />
          <BurgerBuildController
            less={(type) => this.props.lessHandeler(type)}
            more={(type) => this.props.moreHandeler(type)}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchaseable={this.updatePurchase(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
        }
        </div>
    )
  }
}


const mapStatesToProps = state => {

  return {
    ings: state.burgerBuilder.ings,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }

}

const mapDispatchesToProps = dispatch => {

  return {

    lessHandeler: (ingName) => dispatch(actions.removeIngs(ingName)),
    moreHandeler: (ingName) => dispatch(actions.addIngs(ingName)),
    initIngredients: () => dispatch(actions.initialIngs())
  }

}


export default connect(mapStatesToProps, mapDispatchesToProps)(BurgerBuilder);


