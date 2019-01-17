import { PanResponder, Animated, Easing } from "react-native";

export const postStateUpdateAnimateSwipe = (
  dir,
  animXPos,
  screenWidth,
  msg = ''
) => {
  animXPos.setValue(screenWidth * -1 * dir);
  // console.logmsg);
  Animated.spring(animXPos, {
    toValue: 0,
    duration: 250,
    easing: Easing.ease
  }).start();
};

export const createHorizontalPanResponder = (
  animXPos,
  screenWidth,
  releaseCB
) =>
  PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gs) => {
      // console.log"Moving", gs.dx);
      animXPos.setValue(gs.dx);
    },
    onPanResponderRelease: (e, gs) => {
      // console.log"Released");
      // successful swipe
      if (Math.abs(gs.dx) > screenWidth * 0.4) {
        const dir = Math.sign(gs.dx);
        // complete swipe left
        Animated.timing(animXPos, {
          toValue: dir * screenWidth,
          duration: 250,
          easing: Easing.ease
        }).start(() => releaseCB(dir));
      // failed swipe
      } else {
        Animated.spring(animXPos, {
          toValue: 0,
          duration: 100,
          easing: Easing.ease
        }).start();
      }
    }
  });
