import {Platform, ToastAndroid} from 'react-native';
import {getRealDP as dp, getStatusBarHeight, isAndroid} from './screenUtil';
import Color from './Color';

/**
 * 吐司方法
 * @param info 吐司文案信息
 * @return
 */
export function showToast(info) {
  if (isAndroid) {
    return ToastAndroid.show(info, ToastAndroid.SHORT);
  }
  if (!global.toast) {
    return;
  }
  global.toast.show(info);
}

/**
 * 获取默认"react-navigation"导航样式
 * @param navigation
 * @param backgroundColor
 * @return 导航样式
 */
export function getNavBarStyles(navigation, backgroundColor = Color.THEME) {
  return {
    title: navigation.getParam('title', ''),
    headerStyle: Platform.select({
      ios: {
        backgroundColor: backgroundColor,
        height: dp(110),
      },
      android: {
        backgroundColor: backgroundColor,
        height: dp(110) + getStatusBarHeight(),
        paddingTop: getStatusBarHeight(),
      },
    }),
  };
}

/**
 * 获取首页专题背景色
 * @param index 专题id
 * @return 背景色
 */
export function getChapterBgColor(index) {
  const indexStr = index.toString();
  const id = indexStr.substr(indexStr.length - 1);
  const colors = [
    '#79CDCD',
    '#71C671',
    '#4169E1',
    '#3CB371',
    '#EE82EE',
    '#F4A460',
    '#FF7256',
    '#5F9EA0',
    '#79CDCD',
    '#BC8F8F',
  ];
  return colors[id];
}

/**
 * APP主题色数据
 */
export function getThemeColorDataSource() {
  return [
    '#2196F3',
    '#71C671',
    '#87CEFA',
    '#EE82EE',
    '#F4A460',
    '#FF7256',
    '#8FBC8F',
    '#5F9EA0',
    '#79CDCD',
    '#BC8F8F',
    '#7B68EE',
    '#FF69B4',
    '#BA55D3',
    '#000000',
  ];
}
