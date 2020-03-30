import React from 'react'
import { Image, StyleSheet, Text, View, Button } from 'react-native'
import Animated from 'react-native-reanimated'
import Example from '../DraggableBottomSheet/DraggableBottomSheet'


export default class BlurToolbar extends React.Component {

  fall = new Animated.Value(1)

  render() {
    console.log(this.props);

    return (
      <View style={styles.container}>
        <Example/>
        
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
})