/**
 * Created by huangjunsheng on 2019-09-29
 */
import React, {PureComponent} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Color from '../utils/Color';
import NavBar from '../component/NavBar';
import globalStyles from '../styles/globalStyles';
import {
  DEVICE_WIDTH,
  getBottomSpace,
  getRealDP as dp,
} from '../utils/screenUtil';
import images from '../images';

/**
 * 关于作者
 */
class AboutScreen extends PureComponent {
  render() {
    const {navigation} = this.props;
    const gitHubStr = 'https://github.com/aijason';
    const csdnStr = 'https://blog.csdn.net/u010379595';
    return (
      <View style={globalStyles.container}>
        <NavBar title={'关于作者'} navigation={navigation} />
        <View style={styles.content}>
          <Image style={styles.logo} source={images.logoIcon} />
          <Text style={styles.desc}>
            基于Facebook React-Native的玩安卓客户端
          </Text>
          <View style={styles.item}>
            <Text style={styles.itemText}>
              邮箱：
              <Text style={{color: Color.THEME}}>977854695@qq.com</Text>
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>
              CSDN：
              <Text
                style={styles.underlineText}
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
                style={styles.underlineText}
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
            本项目仅工学习使用，不得用作商业目的
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
    bottom: getBottomSpace(),
  },
  underlineText: {
    color: Color.THEME,
    textDecorationLine: 'underline',
  },
});

export default AboutScreen;
