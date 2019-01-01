import React from 'react'
import Burger from '../../Burger/Burger';
import Aux from '../../../hoc/Aux';

const checkoutSummery = (props) => {

    //const ingredients = {};

    return (
        <Aux>
            <h1> hope tests so good </h1>
            <div style={{ width: "60%", margin: "auto" }}>
                <Burger ingredients={props.ingredients} />
            </div>
        </Aux>
    );
}

export default checkoutSummery;