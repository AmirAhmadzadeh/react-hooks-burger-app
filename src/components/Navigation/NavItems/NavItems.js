
import React from 'react'
import classes from './NavItems.css';
import NavItem from './NavItem/NavItem';
import { connect } from 'react-redux';
import Aux from './../../../hoc/Aux';

const navItems = (props) => {


    let authElement;
    if (props.auth.info.auth) {

        authElement = (
            <Aux>
                <NavItem link="/logOut" > Log out</NavItem>
                <NavItem link="/profile" > Profile </NavItem>
                <NavItem link="/orders" > orders</NavItem>
            </Aux>
        )

    } else {
        authElement = <NavItem link="/auth" >auth</NavItem>;
    }


    return (

        <ul className={classes.NavItems}>
            <NavItem link="/" exact={true}> BurgerBuilder</NavItem>
            {authElement}
        </ul>
    );
}


const mapStateToProps = state => {

    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps)(navItems);