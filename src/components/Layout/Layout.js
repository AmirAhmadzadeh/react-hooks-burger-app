import React, { Component } from 'react';

import classes from './Layouts.css';

import ToolBar from './../../components/Navigation/Toolbar/Tollbar';

import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import useBoolean from '../../hooks/useBoolean';


function Layout(props) {

    const [showSideDrawer ,toggle ,setShowSideDrawer] = useBoolean(false)  ; 
      
    
    let cssStyles = "";
    if (props.show) {
        cssStyles = classes.ShowSideDrawer;
    }

    return (
        <React.Fragment>
            <div className={cssStyles}>
                <SideDrawer show={showSideDrawer} clicked={(e) => setShowSideDrawer(false)} />
            </div>
            <ToolBar showMenu={() => setShowSideDrawer(true)} />
            <main className={classes.content}>
                {props.children}
            </main>
        </React.Fragment>
    );
}



export default Layout;