import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import Aux from './hoc/Aux';
import Routes from './Routes/Routes';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import { withRouter } from 'react-router-dom';

class App extends Component {

    componentDidMount = () => {

        this.props.checkUser();
    }

    render() {
        return (

            <Aux>
                <Layout>
                    <Routes authenticated={this.props.auth.info.auth} />
                </Layout>
            </Aux>
        )
    }
}



const mapDispatchToProps = dispatch => {

    return {
        checkUser: () => dispatch(actions.authCheck())
    }
}

const mapStateToProps = state => { 

    return  {
          auth : state.auth   
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
