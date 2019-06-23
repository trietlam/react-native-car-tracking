/**
 * @ProvidesModule carMapReducer
 */
import {
    CAR_FETCH_LOCATION_SUCCESS,
    CAR_FETCH_LOCATION_FAILURE,
    CAR_FETCH_LOCATION_LOADING
}from 'carMapAction';

let initialState = {cars:[],isFirstLoad:true}
export default function(state,action){
    console.log('carmapreducerlog')
    console.log(state)
    switch(action.type){
        case CAR_FETCH_LOCATION_SUCCESS:
            let firstLoad = true;
            if (state.cars.length > 0){
                firstLoad = false;
            }
            return {
                ...state,
                cars:action.payload.value,
                isFirstLoad:firstLoad
            }
        default:
            if(state) return {...state}
            return initialState
    }
}