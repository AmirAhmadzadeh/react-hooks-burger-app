


import React from 'react';
import classes from './NavItem.css';
import { NavLink } from 'react-router-dom';
 

const navItem = (props) => {
    return ( 
        <li className={classes.NavItem}>
        <NavLink to={{pathname : props.link}}
           activeClassName={props.active ? classes.active:null}
           >
            {props.children}
        </NavLink>
        </li>
     );
}
 
export default navItem;