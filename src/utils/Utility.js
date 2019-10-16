import {Platform, ToastAndroid} from 'react-native';
import {getRealDP as dp, getStatusBarHeight, isAndroid} from './screenUtil';
import Color from './Color';
import LanguageUtil from './LanguageUtil';

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
    {name: '默认主题色', color: '#2196F3'},
    {name: '皇家蓝', color: '#4169E1'},
    {name: '军校蓝', color: '#5F9EA0'},
    {name: '深卡其布', color: '#BDB76B'},
    {name: '玫瑰棕色', color: '#BC8F8F'},
    {name: '印度红', color: '#CD5C5C'},
    {name: '深石板灰', color: '#2F4F4F'},
    {name: '海洋绿', color: '#2E8B57'},
    {name: '暗淡的灰色', color: '#696969'},
    {name: '橙色', color: '#FFA500'},
    {name: '粉红色', color: '#FFC0CB'},
    {name: '深粉色', color: '#FF1493'},
    {name: '兰花的紫色', color: '#DA70D6'},
    {name: '适中的紫色', color: '#9370DB'},
    {name: '紫色', color: '#800080'},
    {name: '纯黑', color: '#000000'},
  ];
}

export function i18n(Text) {
  return LanguageUtil.t(Text);
}

/**
 * 抽屉列表数据
 */
export function getDrawerData() {
  return [
    {iconName: 'md-trending-up', title: i18n('my-points')},
    {iconName: 'md-heart', title: i18n('my-collection')},
    {iconName: 'md-globe', title: i18n('frequently-used-websites')},
    {iconName: 'md-person', title: i18n('about-author')},
    {iconName: 'md-share', title: i18n('share-app')},
    {iconName: 'md-settings', title: i18n('settings')},
    {iconName: 'md-power', title: i18n('logout')},
  ];
}

export function getLanguageList() {
  return [
    {language: '简体中文', languageCode: 'zhHans'},
    {language: '繁体中文', languageCode: 'zhHant'},
    {language: 'English', languageCode: 'en'},
  ];
}
