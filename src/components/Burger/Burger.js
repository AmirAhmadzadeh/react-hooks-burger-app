

import React from 'react';
import BurgerIn from './BurgerIngredeit/BurgerIn';
import classes from './Burger.css'

const burger = (props) => {
                         //req    req               optional  op       op
  //array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
    let requestedBurger = Object.keys(props.ingredients).map(igkey =>{
        return  [...Array(props.ingredients[igkey])].map((_,index) =>{
                return <BurgerIn key={igkey + index} type={igkey}/>
        }) ;
    }).reduce((arr,el) => {
        return arr.concat(el) ;    
      },[]);
    if(requestedBurger.length === 0 ) requestedBurger = <p> "please satart adding indgredeint" </p>
 //   console.log(requestedBurger);
   
    return ( 
        <div className={classes.Burger}>
           <BurgerIn type="bread-top" />
         
           {requestedBurger}
           <BurgerIn type="bread-bottom" />
        </div>

     );
}
 
export default burger;