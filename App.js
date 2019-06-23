/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TabBarIOS,Alert
} from 'react-native';
import CarMap from 'CarMap';

export default class App extends Component {
  constructor(){
    super()
    this.state={tabId:0}
  }
  tabSelected(t){
    //Alert.alert('tabSelected')
    this.setState({tabId:t})
  }
  render() {
    return (
      
      <TabBarIOS>
        <TabBarIOS.Item icon={require('./assets/pin.png')} onPress={this.tabSelected.bind(this,0)}
          selected={this.state.tabId===0}>
          <View style={styles.container}>
            <CarMap></CarMap>
          </View>
        </TabBarIOS.Item>    
        <TabBarIOS.Item selected={true} title="Monitor" systemIcon="featured" onPress={this.tabSelected.bind(this,1)}
          selected={this.state.tabId === 1}>
          <View style = {styles.container}>
            <Text>Monitor</Text>
          </View>
        </TabBarIOS.Item>     
      </TabBarIOS>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

