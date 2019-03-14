import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layouts.css';
import ToolBar from './../../components/Navigation/Toolbar/Tollbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';



class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({ showSideDrawer: false });
    }
    showMenuHandeler = () => {

        this.setState({ showSideDrawer: true });

    }
    render() {

        let cssStyles = "";
        if (this.props.show) {
            cssStyles = classes.ShowSideDrawer;
        }
        return (
            <Aux>
                <div className={cssStyles}>
                    <SideDrawer show={this.state.showSideDrawer} clicked={this.closeSideDrawerHandler} />
                </div>
                <ToolBar showMenu={this.showMenuHandeler} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        );

    }


}



export default Layout;