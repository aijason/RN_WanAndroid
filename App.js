import React, {PureComponent} from 'react';
import {View, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
// import {PersistGate} from 'redux-persist/integration/react';
import AppNavigator from './src';
import {setAxios} from './src/service/setAxios';
import Toast from './src/utils/Toast';
import store from './src/store';

// const {store, persistor} = configureStore();

class App extends PureComponent {
  componentDidMount() {
    SplashScreen.hide();
    setAxios(); // 网络设置
    // 全局引用赋值
    global.toast = this.refs.toast;
  }

  render() {
    return (
      <Provider store={store}>
        {/*<PersistGate loading={null} persistor={persistor}>*/}
        <View style={{flex: 1}}>
          <StatusBar barStyle={'light-content'} translucent={true} />
          <AppNavigator />
          <Toast ref="toast" />
        </View>
        {/*</PersistGate>*/}
      </Provider>
    );
  }
}

export default App;
