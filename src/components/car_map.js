/**
 * @providesModule CarMap
 */
import React, {Component} from 'react';
import {
    View,
    Button,
    StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as carMapAction from 'carMapAction';

function mapStateToProps(state){
    return {cars:state.carMapReducer.cars,
            isFirstLoad:state.carMapReducer.isFirstLoad
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(carMapAction,dispatch)
}

class CarMap extends Component {
    constructor(props){
        super(props)

        this.state={cars:[],isFirstLoad:true}        
        this.buttonPressed = this.buttonPressed.bind(this)
    }
    buttonPressed(){
        console.log('Button pressed')
        //var tmp = this.state.mlatitude + 0.001; //simulate move up
        //this.setState({mlatitude:tmp})
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.isFirstLoad && nextProps.isFirstLoad==false){
            this.setState({
                cars:nextProps.cars, 
                mapLat:nextProps.cars[1].Latitude, 
                mapLng:nextProps.cars[1].Longitude
            })
        }
        else{
            this.setState({cars:nextProps.cars})
        }
    }
    componentDidMount(){
        this.timer = setInterval(()=> this.props.carsFetchLocation(), 2000);
    }

    // shouldComponentUpdate(nextProps, nextStats){
    //     console.log('shouldComponentUpdate')
    //     //debugger
    //     return true;
    // }
    render(){
        return (
            <View style={styles.container}>{
                (this.state.mapLat) &&
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: this.state.mapLat,
                        longitude: this.state.mapLng,
                        latitudeDelta: 0.025,
                        longitudeDelta: 0.025,
                    }}>
                    {this.state.cars.map((car)=>(
                        <MapView.Marker key={car.Id} coordinate={{latitude:car.Latitude,longitude:car.Longitude}}>
                        </MapView.Marker>
                    ))
                    /* <MapView.Marker coordinate={{latitude:this.state.mlatitude,longitude:this.state.mlongitude}}>
                    </MapView.Marker>
                    <MapView.Marker coordinate={{latitude:this.state.mlatitude+0.01,longitude:this.state.mlongitude+0.01}}>
                    </MapView.Marker> */}
                </MapView>
                }
                <View style={styles.footer}>
                    <Button title="Move" onPress={()=>this.buttonPressed()}>
                    </Button>
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CarMap)
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex:1
    },  
    map:{
        flex:0.8,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    footer:{
        flex:0.2
    }
})
