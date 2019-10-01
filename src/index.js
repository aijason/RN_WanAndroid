import React from 'react';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from './utils/Color';
import {DEVICE_WIDTH, getRealDP as dp} from './utils/screenUtil';
// import StackViewStyleInterpolator from 'react-navigation-stack/lib/commonjs/views/StackView/StackViewStyleInterpolator';
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

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: '首页',
        tabBarIcon: ({tintColor}) => (
          <Icon name={'ios-home'} size={dp(50)} color={tintColor} />
        ),
      },
    },
    System: {
      screen: SystemScreen,
      navigationOptions: {
        tabBarLabel: '体系',
        tabBarIcon: ({tintColor}) => (
          <Icon name={'md-school'} size={dp(55)} color={tintColor} />
        ),
      },
    },
    WxArticle: {
      screen: WxArticleScreen,
      navigationOptions: {
        tabBarLabel: '公众号',
        tabBarIcon: ({tintColor}) => (
          <Icon name={'ios-people'} size={dp(64)} color={tintColor} />
        ),
      },
    },
    Guide: {
      screen: GuideScreen,
      navigationOptions: {
        tabBarLabel: '导航',
        tabBarIcon: ({tintColor}) => (
          <Icon name={'ios-rocket'} size={dp(50)} color={tintColor} />
        ),
      },
    },
    Project: {
      screen: ProjectScreen,
      navigationOptions: {
        tabBarLabel: '项目',
        tabBarIcon: ({tintColor}) => (
          <Icon name={'ios-paper'} size={dp(50)} color={tintColor} />
        ),
      },
    },
  },
  {
    defaultNavigationOptions: {
      tabBarButtonComponent: props =>
        Platform.select({
          ios: <TouchableOpacity {...props} activeOpacity={0.85} />,
          android: (
            <TouchableNativeFeedback
              {...props}
              background={TouchableNativeFeedback.Ripple(
                'rgba(50,50,50,0.1)',
                true,
              )}>
              <View style={{width: DEVICE_WIDTH / 5}}>{props.children}</View>
            </TouchableNativeFeedback>
          ),
        }),
    },
    tabBarOptions: {
      activeTintColor: Color.THEME,
      inactiveTintColor: Color.TEXT_LIGHT,
      labelStyle: {
        fontSize: dp(20),
      },
      style: {
        height: dp(90),
        paddingVertical: dp(5),
        borderTopWidth: 0,
      },
    },
  },
);

const drawerNavigator = createDrawerNavigator(
  {
    home: {
      screen: TabNavigator,
      navigationOptions: {
        drawerLockMode: 'unlocked',
      },
    },
  },
  {
    drawerWidth: dp(600),
    contentComponent: DrawerScreen,
    hideStatusBar: false,
    statusBarAnimation: 'fade',
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
      // headerBackTitle: '返回', // ios
      // headerStyle: Platform.select({
      //   ios: {
      //     backgroundColor: Color.THEME,
      //     height: dp(110),
      //   },
      //   android: {
      //     backgroundColor: Color.THEME,
      //     height: dp(110) + getStatusBarHeight(),
      //     paddingTop: getStatusBarHeight(),
      //   },
      // }),
      // headerTintColor: Color.WHITE,
      // headerTitleStyle: {
      //   fontWeight: 'bold',
      //   fontSize: dp(36),
      // },
      // headerTitleContainerStyle: Platform.select({
      //   ios: null,
      //   android: {
      //     justifyContent: 'center',
      //     alignItems: 'center',
      //     paddingRight: dp(110),
      //   },
      // }),
    },
  },
);

export default createAppContainer(RootStack);
