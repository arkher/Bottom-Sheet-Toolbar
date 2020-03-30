

import {  
  View, 
  StyleSheet, 
} from 'react-native'
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import React, { useRef, useEffect, Component } from "react";;
import DraggableBottomSheet from './components/blurToolbar/BlurToolbar';

const SCREENS = {
  toolbar: {
    screen: DraggableBottomSheet,
    title: 'Blur Toolbar',
  }

}

class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Teste Popup',
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#000"
        }}
      >
        
        <DraggableBottomSheet/>
      </View>
    );
  }
}


const ExampleApp = createAppContainer(
  createStackNavigator(
    {
      Main: { screen: MainScreen },
      ...SCREENS,
    },
    {
      initialRouteName: 'Main',
    }
  )
)


const styles = StyleSheet.create({
  list: {
    backgroundColor: '#EFEFF4',
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDBE0',
  },
  buttonText: {
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})

export default ExampleApp
