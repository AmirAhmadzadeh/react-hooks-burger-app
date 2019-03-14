


import React from 'react'
import classes from './BuildBurgerControll.css'
import BuildControl from './BildControl/BuildControl';
const controls = [

    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },

];



const BuildBurgerControll = (props) => {

  
    return (
        <div className={classes.BuildControls}>
            <p>Price : <strong>{props.price.toFixed(2)}</strong></p>
            {
                controls.map((c, index) => {

                    return <BuildControl 
                        less={() => props.less(c.type)}
                        more={() => props.more(c.type)}
                        key={c.label}
                        label={c.label}
                        disabled={props.disabled[c.type]}
                    />
                })
            }

            <button
                className={classes.OrderButton}
                disabled={!props.purchaseable}
                onClick={props.ordered}
            > 
                { props.isAuthenticated ? "ORDER" : "Signin To Order" }
             </button>
        </div>
    );
}



export default BuildBurgerControll;