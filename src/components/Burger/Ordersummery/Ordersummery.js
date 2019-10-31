import React, { Component } from 'react'
import Aux from '../../../hoc/Aux';
import Button from './../../UI/Button/Button';



function OrderSummery(props) {
    const ingrideintsSummery = Object.keys( props.ingrideints ).map(igkey => {
        return <li key={igkey}> <span>{igkey}</span>:{props.ingrideints[igkey]}</li>
    });
    return (
        <Aux>
            <h3>
                youre Order
            </h3>
            <p>delicious burger with this ingredeints :</p>
            <ul>
                {ingrideintsSummery}
            </ul>
            <p>
                countinue to check out ?
            </p>
            <p>
                total price:<strong> {props.totalPrice.toFixed(2)} $ </strong>
            </p>

            <Button btnType="Danger" clicked={props.cancelProcess}> Cancel</Button>
            <Button btnType="Success" clicked={props.continueProcess}> Continue</Button>
        </Aux>
    );
}
export default OrderSummery;