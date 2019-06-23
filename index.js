import { AppRegistry } from 'react-native';
import React, {Component} from 'react';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import carMapReducer from './src/reducers/car_map_reducer';
import App from './App';

const configureStore = (initialState)=>{
    return createStore(
        combineReducers({carMapReducer}),
        initialState,
        applyMiddleware(thunk,logger)
    )
}
let store = configureStore();
export class CarTracking extends Component{
    render(){
        return(
            <Provider store = {store}>
                <App/>
            </Provider>
        )
    }
}
AppRegistry.registerComponent('CarTracking', () => CarTracking);
