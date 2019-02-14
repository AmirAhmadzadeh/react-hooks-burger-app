import React from 'react'
import Burger from '../../Burger/Burger';
import Aux from '../../../hoc/Aux';
import classes from './CheckOutSummery.css';


const checkoutSummery = (props) => {

    

    return (
        <Aux>
            <h1> hope tests so good </h1>
            <div style={{ width: "60%", margin: "auto" }}>
                <Burger ingredients={props.ingredients} />
            </div>

            <div className={classes.ButtonArea}>
                <div className={classes.Button} onClick={props.continue}>continue</div>
                <div className={classes.Button} onClick={props.cancel} >cancel</div>
            </div>
        </Aux>
    );
}



export default checkoutSummery;