
import React from 'react'
import { Image, StyleSheet, Text, View, Button } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'

/*Antes de instalara lib "reanimated-bottom-sheet", 
instala a "react-native-reanimated" e a "react-native-gesture-handler". 
Link da lib: https://github.com/osdnk/react-native-reanimated-bottom-sheet*/

export default class DraggableBottomSheet extends React.Component {
  renderInner = () => (
    <View style={styles.panel}>
      <View style={styles.draggableContainer}>
        <View style={[styles.draggableIcon]} />
      </View>
      <View style={styles.panelButton}>
        <Text style={styles.panelTitle}>yaaa</Text>
      </View>
      <View style={styles.panelButton}>
        <Text style={styles.panelTitle}>yooo</Text>
      </View>
      <View style={styles.panelButton}>
        <Text style={styles.panelTitle}>yuuu</Text>
      </View>
    </View>
  )


  fall = new Animated.Value(1)

  render() {

    return (
      <View style={styles.container}>
        <BottomSheet
          snapPoints={[400, 115]}
          renderContent={this.renderInner}
          initialSnap={1}
          callbackNode={this.fall}
          enabledInnerScrolling={false}
        />
        <Animated.View
          style={{
            alignItems: 'center',
            opacity: Animated.add(0.1, Animated.multiply(this.fall, 0.9)),
          }}
        >
          {/* <Text style={{ color: "black", top: 30 }}>XDXDXD</Text> */}
          <Button title="YO BRO" onPress={() => console.log("YO BRO")} />

        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: 600,
    padding: 20,
    backgroundColor: 'white',
    // backgroundColor: '#2c2c2fAA',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  header: {
    width: '100%',
    height: 50,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    textAlign: "center",
    color: "white"
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#292929',
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    color: 'white',
  },
  draggableIcon: {
    width: 55,
    height: 7,
    borderRadius: 5,
    backgroundColor: "#50A1FF",
    alignSelf: 'center',

  }
})