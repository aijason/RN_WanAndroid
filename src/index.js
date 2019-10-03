import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {getRealDP as dp} from './utils/screenUtil';
// import StackViewStyleInterpolator from 'react-navigation-stack/lib/commonjs/views/StackView/StackViewStyleInterpolator';
import BottomTabBar from './component/BottomTabBar';
// Screen
import HomeScreen from './screen/HomeScreen';
import SystemScreen from './screen/SystemScreen';
import WxArticleScreen from './screen/WxArticleScreen';
import GuideScreen from './screen/GuideScreen';
import ProjectScreen from './screen/ProjectScreen';
import DrawerScreen from './screen/DrawerScreen';
import WebViewScreen from './screen/WebViewScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import ArticleTabScreen from './screen/ArticleTabScreen';
import WebsitesScreen from './screen/WebsitesScreen';
import SearchScreen from './screen/SearchScreen';
import SearchArticleScreen from './screen/SearchArticleScreen';
import AboutScreen from './screen/AboutScreen';
import CollectScreen from './screen/CollectScreen';

const TabScreens = createBottomTabNavigator(
  {
    Home: HomeScreen,
    System: SystemScreen,
    WxArticle: WxArticleScreen,
    Guide: GuideScreen,
    Project: ProjectScreen,
  },
  {
    defaultNavigationOptions: {
      tabBarButtonComponent: props => <BottomTabBar {...props} />,
    },
    tabBarOptions: {
      showLabel: false,
      showIcon: false,
      style: {
        height: dp(90),
        borderTopWidth: 0,
      },
    },
  },
);

const drawerNavigator = createDrawerNavigator(
  {
    Tabs: TabScreens,
  },
  {
    drawerWidth: dp(600),
    contentComponent: DrawerScreen,
    hideStatusBar: false,
    statusBarAnimation: 'fade',
    defaultNavigationOptions: {
      drawerLockMode: 'unlocked',
    },
  },
);

const RootStack = createStackNavigator(
  {
    Home: drawerNavigator,
    WebView: WebViewScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    ArticleTab: ArticleTabScreen,
    Websites: WebsitesScreen,
    Search: SearchScreen,
    SearchArticle: SearchArticleScreen,
    About: AboutScreen,
    Collect: CollectScreen,
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
    // 用于设置安卓卡片式跳转
    // transitionConfig: () => ({
    //   screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    // }),
    navigationOptions: () => ({
      gesturesEnabled: true,
    }),
    // 默认导航头样式设置
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default createAppContainer(RootStack);
