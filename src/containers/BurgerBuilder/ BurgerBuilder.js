import React, { useEffect } from 'react';
import Aux from '../../hoc/Aux';
import Burger from './../../components/Burger/Burger';
import BurgerBuildController from '../../components/Burger/BuildBurgerControll/BuildBurgerControll';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummery from './../../components/Burger/Ordersummery/Ordersummery';
import Spinner from './../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from './../../store/actions/index';
import { Redirect } from 'react-router-dom';
import useBoolean from '../../hooks/useBoolean';

function BurgerBuilder(props) {

  const [loading, toggleLoading, setLoading] = useBoolean(false);

  const [purchasing, togglePurchasing, setPurchasing] = useBoolean(false);

  useEffect(() => {

    
      console.log('[use Effect :_ ]')
      props.initIngredients();

     
  } ,[]);

  const updatePurchase = (ingredients) => {

    const sum = Object.keys(ingredients).map(igkey => {

      return ingredients[igkey];

    }).reduce((sum, el) => {

      return sum + el;

    }, 0);
    return sum > 0;
  }

  const purchaseHandler = () => {

    console.log('helloooooo ] ' , props.auth, props.building) ; 
    if (!props.auth.info.auth) {

      if (props.building) {

        props.setRedirectPath('/checkout');

      }

      props.history.push('/auth');

    }

    setPurchasing(true);

  }


  const purchaseCancelHandler = () => {

    setPurchasing(false);

  }


  const purchaseContinueHandler = () => {

    props.history.push('/checkout');

  }

  const getOrderSummary = () => {

    if (loading) return <Spinner />;

    // else if (this.state.enrollerdRequest) rolledMessage = <p>thanks for youre choice </p>;

    return (

      <OrderSummery

        continueProcess={purchaseContinueHandler}

        cancelProcess={purchaseCancelHandler}

        ingrideints={props.ings}

        totalPrice={props.totalPrice}

      />

    )

  };

  const disabledInfo = {

    ...props.ings

  };

  for (let item in disabledInfo) {

    disabledInfo[item] = disabledInfo[item] <= 0 ? true : false;

  }

  return (

    <div>

      {

        props.error ? <Redirect to="/error" /> :

          <Aux>

            <Modal

              show={purchasing}

              closeModal={purchaseCancelHandler}

            >

              {getOrderSummary()}

              {/* {rolledMessage} */}

            </Modal>

            <Burger ingredients={props.ings} />

            <BurgerBuildController

              less={(type) => props.lessHandeler(type)}

              more={(type) => props.moreHandeler(type)}

              disabled={disabledInfo}

              price={props.totalPrice}

              purchaseable={updatePurchase(props.ings)}

              ordered={purchaseHandler}

              isAuthenticated={props.auth.info.auth}

            />

          </Aux>

      }

    </div>

  )

}


const mapStatesToProps = state => {

  return {

    ings: state.burgerBuilder.ings,

    totalPrice: state.burgerBuilder.totalPrice,

    building: state.burgerBuilder.building,

    error: state.burgerBuilder.error,

    auth: state.auth
  }

}

const mapDispatchesToProps = dispatch => {

  return {

    lessHandeler: (ingName) => dispatch(actions.removeIngs(ingName)),

    moreHandeler: (ingName) => dispatch(actions.addIngs(ingName)),

    initIngredients: () => dispatch(actions.initialIngs()),

    setRedirectPath: (path) => dispatch(actions.setAuthRedirect(path))
  }
}


export default connect(mapStatesToProps, mapDispatchesToProps)(BurgerBuilder);


