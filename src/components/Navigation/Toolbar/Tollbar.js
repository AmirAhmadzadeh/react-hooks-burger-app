
import React from 'react';
import classes from './ToolBar.css';
import Logo from './../../Logo/Logo';
import NavItems from './../NavItems/NavItems';
import Menu from './../SideDrawer/Drawer/Drawer';
const toolbar = (props) => {
        return (
                <header className={classes.Toolbar}>

                        <Menu showMenu={props.showMenu} />

                        <Logo />
                        <nav className={classes.DesktopOnly}>
                                <NavItems />
                        </nav>
                </header>

        );
}

export default toolbar;