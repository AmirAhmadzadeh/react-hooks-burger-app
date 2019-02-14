


import React from 'react';
import classes from './NavItem.css';
import { NavLink } from 'react-router-dom';
 

const navItem = (props) => {
    return ( 
        <li className={classes.NavItem}>
        <NavLink to={{pathname : props.link}}
           exact
           activeClassName={classes.active}
           >
            {props.children}
        </NavLink>
        </li>
     );
}
 
export default navItem;