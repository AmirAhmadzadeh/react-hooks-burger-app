import React, { useEffect, useCallback } from 'react';
import Aux from '../../hoc/Aux';
import Burger from './../../components/Burger/Burger';
import BurgerBuildController from '../../components/Burger/BuildBurgerControll/BuildBurgerControll';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummery from './../../components/Burger/Ordersummery/Ordersummery';
import Spinner from './../../components/UI/Spinner/Spinner';
import {  useDispatch, useSelector  } from 'react-redux';
import * as actions from './../../store/actions/index';
import { Redirect } from 'react-router-dom';
import useBoolean from '../../hooks/useBoolean';

function BurgerBuilder(props) {

  const [loading, toggleLoading, setLoading] = useBoolean(false);
  const [purchasing, togglePurchasing, setPurchasing] = useBoolean(false);
  const ings = useSelector(state =>  state.burgerBuilder.ings ) ; 
  const auth = useSelector(state =>  state.auth ) ; 
  const totalPrice = useSelector(state => state.burgerBuilder.totalPrice) ; 
  const error = useSelector (state => state.burgerBuilder.error );
  const building = useSelector(state => state.burgerBuilder.building ) ; 
  const dispatch = useDispatch();

  
  const lessHandeler =  (ingName) => dispatch(actions.removeIngs(ingName));
  
  const moreHandeler = (ingName) => dispatch(actions.addIngs(ingName));
  
  const initIngredients = useCallback(() => dispatch(actions.initialIngs()) , [dispatch]);
  
  const setRedirectPath = (path) => dispatch(actions.setAuthRedirect(path))

  useEffect(() => {


    console.log('[use Effect :_ ]')
    initIngredients();


  }, []);

  const updatePurchase = (ingredients) => {

    const sum = Object.keys(ingredients).map(igkey => {

      return ingredients[igkey];

    }).reduce((sum, el) => {

      return sum + el;

    }, 0);
    return sum > 0;
  }

  const purchaseHandler = () => {

    console.log('helloooooo ] ', auth, building);
    if (!auth.info.auth) {
      if (building) {
        setRedirectPath('/checkout');
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

        ingrideints={ings}

        totalPrice={totalPrice}

      />

    )

  };

  const disabledInfo = {

    ...ings

  };

  for (let item in disabledInfo) {

    disabledInfo[item] = disabledInfo[item] <= 0 ? true : false;

  }

  return (

    <div>

      {

        error ? <Redirect to="/error" /> :

          <Aux>

            <Modal

              show={purchasing}

              closeModal={purchaseCancelHandler}

            >

              {getOrderSummary()}

              {/* {rolledMessage} */}

            </Modal>

            <Burger ingredients={ings} />

            <BurgerBuildController

              less={(type) => lessHandeler(type)}

              more={(type) => moreHandeler(type)}

              disabled={disabledInfo}

              price={totalPrice}

              purchaseable={updatePurchase(ings)}

              ordered={purchaseHandler}

              isAuthenticated={auth.info.auth}

            />

          </Aux>

      }

    </div>

  )

}




export default BurgerBuilder;


