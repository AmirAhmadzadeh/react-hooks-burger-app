import React from 'react';
import classes from './Drawer.css' ;

const drawer = (props) => {
    return ( 
        <div className={classes.Drawer} onClick={props.showMenu}>
           <div></div>
           <div></div>
           <div></div>
        </div>
     );
}
 
export default drawer;