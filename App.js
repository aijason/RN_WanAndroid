import React, {PureComponent} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {pickBy, identity} from 'lodash';
import AppNavigator from './src';
import {setAxios} from './src/service/setAxios';
import Toast from './src/utils/Toast';
import store from './src/store';
import AuthUtil from './src/utils/AuthUtil';
import {toInitialAuthInfo} from './src/actions';
import StorageUtil from './src/utils/storageUtil';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.initialInfo = this.initialInfo.bind(this);
  }

  componentDidMount() {
    SplashScreen.hide();
    setAxios(); // 网络设置
    // 全局引用赋值
    global.toast = this.refs.toast;
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
        <StatusBar barStyle={'light-content'} translucent={true} />
        <AppNavigator />
        <Toast ref="toast" />
      </Provider>
    );
  }
}

export default App;
