import {PixelRatio, Dimensions, Platform, StatusBar} from 'react-native';

export let DEVICE_WIDTH = Dimensions.get('window').width;
export let DEVICE_HEIGHT = Dimensions.get('window').height;
export const isAndroid = Platform.OS === 'android';

/**
 * 本项目设计基准像素为750 * 1334，使用时视情况调整
 * 按比例将设计的px转换成适应不同屏幕的dp
 * @param designPx 设计稿标注的px值
 * @returns {number}
 */
export function getRealDP(designPx) {
  return PixelRatio.roundToNearestPixel((designPx / 750) * DEVICE_WIDTH);
}

// 是否iphoneX系列（iPhone X, XS, XS Max & XR）
export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      (dimen.height === 896 || dimen.width === 896))
  );
}

// 获取状态栏高度
export function getStatusBarHeight() {
  return Platform.select({
    ios: ifIphoneX(44, 20),
    android: StatusBar.currentHeight,
  });
}

// 适配iphoneX屏幕底部距离
export function getBottomSpace() {
  return ifIphoneX(34, 0);
}

/**
 * 根据是否是iPhoneX返回不同的样式
 * @param iphoneXStyle
 * @param iosStyle
 * @param androidStyle
 * @returns {*}
 */
export function ifIphoneX(iphoneXStyle, iosStyle = {}, androidStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  } else if (Platform.OS === 'ios') {
    return iosStyle;
  } else {
    if (androidStyle) {
      return androidStyle;
    }
    return iosStyle;
  }
}
