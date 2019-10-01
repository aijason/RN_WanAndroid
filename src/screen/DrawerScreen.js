/**
 * Created by huangjunsheng on 2019-09-16
 */
import React, {PureComponent} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  Share,
} from 'react-native';
import globalStyles from '../styles/globalStyles';
import {getRealDP as dp} from '../utils/screenUtil';
import Color from '../utils/Color';
import Touchable from '../component/Touchable';
import Icon from 'react-native-vector-icons/Ionicons';
import images from '../images';
import {connect} from 'react-redux';
import {fetchToLogout} from '../actions';
import {showToast} from '../utils/Utility';

/**
 * 抽屉
 */
class DrawerScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    // 抽屉item数据源
    this.drawerData = [
      {iconName: 'md-heart', title: '我的收藏'},
      {iconName: 'md-globe', title: '常用网站'},
      {iconName: 'md-color-palette', title: '主题'},
      {iconName: 'md-share', title: '分享'},
      {iconName: 'md-person', title: '关于作者'},
      {iconName: 'md-power', title: '退出登录'},
    ];
    this.handleDrawerItemPress = this.handleDrawerItemPress.bind(this);
  }

  async onShare() {
    try {
      await Share.share({
        message: '分享一个使用React Native开发的玩安卓应用，点击下载：',
      });
    } catch (error) {
      alert(error.message);
    }
  }

  handleDrawerItemPress(type) {
    const {navigation, isLogin} = this.props;
    switch (type) {
      case '我的收藏':
        if (!isLogin) {
          navigation.navigate('Login');
          return showToast('请先登录');
        }
        navigation.navigate('Collect');
        break;
      case '常用网站':
        navigation.navigate('Websites');
        break;
      case '主题':
        break;
      case '分享':
        this.onShare();
        break;
      case '关于作者':
        navigation.navigate('About');
        break;
      case '退出登录':
        fetchToLogout();
        break;
      default:
        break;
    }
  }

  renderDrawerItem(item) {
    const {isLogin} = this.props;
    if (!isLogin && item.title === '退出登录') {
      return null;
    }
    return (
      <Touchable
        key={item.iconName}
        isNativeFeedback
        onPress={() => this.handleDrawerItemPress(item.title)}>
        <View style={styles.drawerItem}>
          <Icon name={item.iconName} size={dp(40)} color={Color.TEXT_DARK} />
          <Text style={styles.drawerTitleText}>{item.title}</Text>
        </View>
      </Touchable>
    );
  }

  render() {
    const {navigation, userInfo, isLogin} = this.props;
    return (
      <View style={globalStyles.container}>
        <Touchable
          isWithoutFeedback
          disabled={isLogin}
          onPress={() => navigation.navigate('Login')}>
          <View style={styles.topContainer}>
            <View>
              <Image
                source={images.logoIcon}
                style={styles.logo}
                resizeMode={'cover'}
              />
              <Text style={styles.loginText}>
                {userInfo.username ? userInfo.username : '未登录'}
              </Text>
            </View>
            <Touchable
              isPreventDouble={false}
              isNativeFeedback
              background={TouchableNativeFeedback.Ripple(
                'rgba(50,50,50,0.3)',
                true,
              )}
              onPress={() => navigation.closeDrawer()}>
              <View style={styles.closeIconWrapper}>
                <Icon name={'md-close'} size={dp(50)} color={Color.WHITE} />
              </View>
            </Touchable>
          </View>
        </Touchable>
        <View style={{marginTop: dp(28)}}>
          {this.drawerData.map(item => this.renderDrawerItem(item))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    height: dp(450),
    width: dp(600),
    backgroundColor: Color.THEME,
    paddingTop: dp(130),
    paddingHorizontal: dp(28),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: dp(200),
    height: dp(200),
    borderRadius: dp(100),
  },
  loginText: {
    fontSize: dp(40),
    color: Color.WHITE,
    fontWeight: 'bold',
    marginTop: dp(40),
    marginLeft: dp(15),
  },
  drawerItem: {
    height: dp(100),
    paddingLeft: dp(28),
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerTitleText: {
    fontSize: dp(28),
    color: Color.TEXT_MAIN,
    marginLeft: dp(50),
    marginBottom: dp(5),
  },
  closeIconWrapper: {
    width: dp(60),
    height: dp(60),
    borderRadius: dp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    isLogin: state.user.isLogin,
    userInfo: state.user.userInfo,
  };
};

export default connect(mapStateToProps)(DrawerScreen);
