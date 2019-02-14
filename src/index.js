import React from 'react';

import ReactDOM from 'react-dom';

import './index.css';

import App from './App';

import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import { createStore ,compose  ,applyMiddleware , combineReducers } from 'redux';

import buildBurgerReducer from './store/reducers/burgerBuilder';

import orderReducer from './store/reducers/order' ;

import thunk from 'redux-thunk' ; 

import authReducer from './store/reducers/auth'



const composeEnhaunster = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ; 

const rootReducer = combineReducers({

    burgerBuilder : buildBurgerReducer , 
    order : orderReducer , 
    auth: authReducer
});




const store = createStore(rootReducer ,composeEnhaunster(applyMiddleware(thunk))) ;

ReactDOM.render(
    <Provider store={store} >
            <BrowserRouter>
                  <App />
            </BrowserRouter>
    </Provider>
    ,
    
document.getElementById('root'));


serviceWorker.unregister();
