/**
 * Created by huangjunsheng on 2019-09-29
 */
import React, {PureComponent} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Color from '../../utils/Color';
import NavBar from '../../component/NavBar';
import globalStyles from '../../styles/globalStyles';
import {
  DEVICE_WIDTH,
  getBottomSpace,
  getRealDP as dp,
} from '../../utils/screenUtil';
import images from '../../images';
import {connect} from 'react-redux';
import {i18n} from '../../utils/Utility';

/**
 * 关于作者
 */
class AboutScreen extends PureComponent {
  render() {
    const {navigation, themeColor} = this.props;
    const gitHubStr = 'https://github.com/aijason';
    const csdnStr = 'https://blog.csdn.net/u010379595';
    return (
      <View style={globalStyles.container}>
        <NavBar title={i18n('about-author')} navigation={navigation} />
        <View style={styles.content}>
          <Image style={styles.logo} source={images.logoIcon} />
          <Text style={styles.desc}>
            {i18n('wanAndroid-client-based-on-Facebook-react-native')}
          </Text>
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {i18n('email')}：
              <Text style={{color: themeColor}}>977854695@qq.com</Text>
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>
              CSDN：
              <Text
                style={[styles.underlineText, {color: themeColor}]}
                onPress={() => {
                  navigation.navigate('WebView', {
                    title: 'CSDN',
                    url: csdnStr,
                  });
                }}>
                {csdnStr}
              </Text>
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>
              GitHub：
              <Text
                style={[styles.underlineText, {color: themeColor}]}
                onPress={() => {
                  navigation.navigate('WebView', {
                    title: 'GitHub',
                    url: gitHubStr,
                  });
                }}>
                {gitHubStr}
              </Text>
            </Text>
          </View>
          <Text style={styles.bottomText}>
            {i18n(
              'This project is for learning purposes only, not for commercial purposes',
            )}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: Color.WHITE,
    alignItems: 'center',
    paddingVertical: dp(150),
  },
  logo: {
    width: dp(180),
    height: dp(189),
    borderRadius: dp(90),
    marginBottom: dp(50),
  },
  desc: {
    fontSize: dp(30),
    color: Color.TEXT_MAIN,
    marginTop: dp(20),
    marginBottom: dp(100),
  },
  blogStyle: {
    width: dp(200),
    height: dp(200),
    borderRadius: dp(100),
    backgroundColor: '#FF7256',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: dp(20),
    marginHorizontal: dp(20),
  },
  githubStyle: {
    width: dp(200),
    height: dp(200),
    borderRadius: dp(100),
    backgroundColor: '#5F9EA0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: dp(20),
    marginHorizontal: dp(20),
  },
  item: {
    paddingHorizontal: dp(50),
    marginBottom: dp(50),
    width: DEVICE_WIDTH,
  },
  itemText: {
    fontSize: dp(30),
    color: Color.TEXT_MAIN,
  },
  bottomText: {
    fontSize: dp(24),
    color: Color.TEXT_MAIN,
    position: 'absolute',
    marginVertical: dp(50),
    paddingHorizontal: dp(28),
    bottom: getBottomSpace(),
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
});

const mapStateToProps = state => {
  return {
    themeColor: state.user.themeColor,
  };
};

export default connect(mapStateToProps)(AboutScreen);
