import React, { useEffect } from 'react';
import Layout from './components/Layout/Layout';
import Aux from './hoc/Aux';
import Routes from './Routes/Routes';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import { withRouter } from 'react-router-dom';


function App(props) { 

    useEffect(() => {
        props.checkUser();
    },[]) ; 
    
    return (

        <Aux>
            <Layout>
                <Routes authenticated={props.auth.info.auth} />
            </Layout>
        </Aux>
    ) ; 
}



const mapDispatchToProps = dispatch => {

    return {
        checkUser: () => dispatch(actions.authCheck())
    }
}


const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
