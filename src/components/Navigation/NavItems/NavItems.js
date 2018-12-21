
import React from 'react'
import classes from './NavItems.css' ;
import NavItem from './NavItem/NavItem';
const navItems = (props) => {
    return ( 

           <ul className={classes.NavItems}>
               <NavItem link="/" active > BurgerBuilder</NavItem>
               <NavItem link="/" > checkOut</NavItem>
           </ul> 
     );
}
 
export default navItems;