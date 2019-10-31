import React, {PureComponent} from 'react';
import {StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {pickBy, identity} from 'lodash';
import AppNavigator from './src';
import {setAxios} from './src/service/setAxios';
import store from './src/store';
import AuthUtil from './src/utils/AuthUtil';
import {switchAPPLanguage, toInitialAuthInfo} from './src/actions';
import Toast from './src/utils/Toast';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.initialInfo = this.initialInfo.bind(this);
  }

  static async getDerivedStateFromProps() {
    const language = await AuthUtil.getAppLanguage();
    if (language) {
      await switchAPPLanguage(language); // 设置app语言环境
    } else {
      await switchAPPLanguage('zhHans'); // 默认中文
    }
  }

  componentDidMount() {
    SplashScreen.hide();
    setAxios(); // 网络设置
    global.toast = this.refs.toast; // 全局引用赋值
    this.initialInfo();
  }

  async initialInfo() {
    const userInfo = await AuthUtil.getUserInfo();
    const themeColor = await AuthUtil.getThemeColor();
    const authInfo = pickBy(
      {
        isLogin: !!userInfo,
        userInfo,
        themeColor,
      },
      identity,
    );
    if (Object.keys(authInfo).length === 0) {
      return;
    }
    console.log('初始化缓存信息', authInfo);
    toInitialAuthInfo(authInfo);
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <StatusBar barStyle={'light-content'} translucent={true} />
          <AppNavigator />
          <Toast ref="toast" />
        </View>
      </Provider>
    );
  }
}

export default App;
