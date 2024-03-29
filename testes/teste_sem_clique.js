import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  Animated,
  PanResponder,
  Platform
} from "react-native";
import styles from "./style";

const SUPPORTED_ORIENTATIONS = [
  "portrait",
  "portrait-upside-down",
  "landscape",
  "landscape-left",
  "landscape-right"
];

class RBSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      animatedHeight: new Animated.Value(0),
      pan: new Animated.ValueXY({x:0, y:0})
    };

    this.createPanResponder(props);
  }

  setModalVisible(visible, props) {
    const { height, minClosingHeight, duration, onClose, onOpen } = this.props;
    const { animatedHeight, pan } = this.state;
    if (visible) {
      console.log("APARECE");
      
      this.setState({ modalVisible: visible });
      if (typeof onOpen === "function") onOpen(props);
      Animated.timing(animatedHeight, {
        toValue: height,
        duration
      }).start();
    } else {
      console.log("FECHA");
      
      Animated.timing(animatedHeight, {
        toValue: minClosingHeight,
        duration
      }).start(() => {
        pan.setValue({ x: 0, y: 0 });
        
        this.setState({
          modalVisible: true,
          animatedHeight: new Animated.Value(120)
        });

        if (typeof onClose === "function") onClose(props);
      });
    }
  }

  createPanResponder(props) {
    const { closeOnDragDown, height } = props;
    const { pan } = this.state;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => closeOnDragDown,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          Animated.event([null, { dy: pan.y }])(e, gestureState);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        
        if (height / 4 - gestureState.dy < 0) {
          this.setModalVisible(false);
          // Animated.spring(pan, { toValue: { x: 0, y: height } }).start();
        } else {
          console.log("aqui");
          this.setModalVisible(true);
          Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
        }
      }
    });
  }

  open(props) {
    this.setModalVisible(true, props);
  }

  close(props) {
    this.setModalVisible(true, props);
  }

  render() {
    const {
      animationType,
      closeOnDragDown,
      closeOnPressMask,
      closeOnPressBack,
      children,
      customStyles,
      keyboardAvoidingViewEnabled
    } = this.props;
    const { animatedHeight, pan, modalVisible } = this.state;
    const panStyle = {
      transform: pan.getTranslateTransform()
    };

    return (
      <Modal
        transparent
        animationType={animationType}
        visible={modalVisible}
        supportedOrientations={SUPPORTED_ORIENTATIONS}
        onRequestClose={() => {
          if (closeOnPressBack) this.setModalVisible(false);
        }}
        presentationStyle={{}}
      >
        <KeyboardAvoidingView
          enabled={keyboardAvoidingViewEnabled}
          behavior="padding"
          style={[styles.wrapper, customStyles.wrapper]}
        >
          <TouchableOpacity
            style={styles.mask}
            activeOpacity={1}
            onPress={() => (closeOnPressMask ? this.close() : null)}
          />
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[panStyle, styles.container, { height: animatedHeight }, customStyles.container]}
          >
            {closeOnDragDown && (
              <View style={styles.draggableContainer}>
                <View style={[styles.draggableIcon, customStyles.draggableIcon]} />
              </View>
            )}
            {children}
          </Animated.View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

RBSheet.propTypes = {
  animationType: PropTypes.oneOf(["none", "slide", "fade"]),
  height: PropTypes.number,
  minClosingHeight: PropTypes.number,
  duration: PropTypes.number,
  closeOnDragDown: PropTypes.bool,
  closeOnPressMask: PropTypes.bool,
  closeOnPressBack: PropTypes.bool,
  keyboardAvoidingViewEnabled: PropTypes.bool,
  customStyles: PropTypes.objectOf(PropTypes.object),
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  children: PropTypes.node
};

RBSheet.defaultProps = {
  animationType: "none",
  height: 260,
  minClosingHeight: 0,
  duration: 300,
  closeOnDragDown: false,
  closeOnPressMask: true,
  closeOnPressBack: true,
  keyboardAvoidingViewEnabled: Platform.OS === "ios",
  customStyles: {},
  onClose: null,
  onOpen: null,
  children: <View />
};

export default RBSheet;