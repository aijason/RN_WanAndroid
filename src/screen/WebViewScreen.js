import React, {PureComponent} from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import ProgressBar from '../component/ProgressBar';
import globalStyles from '../styles/globalStyles';
import NavBar from '../component/NavBar';

/**
 * WebViewScreen
 */
class WebViewScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
    };
  }

  render() {
    const {navigation} = this.props;
    const url = navigation.getParam('url', 'https://www.wanandroid.com/');
    const title = navigation.getParam('title', '');
    return (
      <View style={globalStyles.container}>
        <NavBar title={title} navigation={navigation} />
        <ProgressBar progress={this.state.progress} />
        <WebView
          source={{uri: url}}
          onLoadProgress={({nativeEvent}) => {
            this.setState({progress: nativeEvent.progress});
          }}
        />
      </View>
    );
  }
}

export default WebViewScreen;
