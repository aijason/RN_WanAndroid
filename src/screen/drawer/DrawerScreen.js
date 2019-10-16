/**
 * Created by huangjunsheng on 2019-09-16
 */
import React, {PureComponent} from 'react';
import {
  Alert,
  DeviceEventEmitter,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  getRealDP as dp,
} from '../../utils/screenUtil';
import Color from '../../utils/Color';
import Touchable from '../../component/Touchable';
import Icon from 'react-native-vector-icons/Ionicons';
import images from '../../images';
import {connect} from 'react-redux';
import {fetchToLogout} from '../../actions';
import {getDrawerData, i18n, showToast} from '../../utils/Utility';

/**
 * 抽屉
 */
class DrawerScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      isShowIndicator: false,
      drawerData: getDrawerData(), // 抽屉item数据源
    };
    this.renderHeader = this.renderHeader.bind(this);
    this.handleDrawerItemPress = this.handleDrawerItemPress.bind(this);
  }

  componentDidMount() {
    this.eventEmitter = DeviceEventEmitter.addListener('switchLanguage', () => {
      this.setState({
        drawerData: getDrawerData(),
      });
    });
  }

  componentWillUnmount() {
    this.eventEmitter && this.eventEmitter.remove();
  }

  async onShare() {
    try {
      await Share.share({
        message: i18n('share-app-desc'),
      });
    } catch (error) {
      alert(error.message);
    }
  }

  handleDrawerItemPress(type) {
    const {navigation, isLogin} = this.props;
    switch (type) {
      case 'md-trending-up': // 我的积分
        if (!isLogin) {
          navigation.navigate('Login');
          return showToast(i18n('please-login-first'));
        }
        navigation.navigate('CoinDetail');
        break;
      case 'md-heart': // 我的收藏
        if (!isLogin) {
          navigation.navigate('Login');
          return showToast(i18n('please-login-first'));
        }
        navigation.navigate('Collect');
        break;
      case 'md-globe': // 常用网站
        navigation.navigate('Websites');
        break;
      case 'md-share': // 分享
        this.onShare();
        break;
      case 'md-person': // 关于作者
        navigation.navigate('About');
        break;
      case 'md-settings': // 设置
        navigation.navigate('Setting');
        break;
      case 'md-power': // 退出登录
        Alert.alert(
          i18n('tips'),
          `${i18n('Are you sure to log out')}？`,
          [
            {text: i18n('cancel'), onPress: () => {}},
            {text: i18n('confirm'), onPress: () => fetchToLogout()},
          ],
          {cancelable: false},
        );
        break;
      default:
        break;
    }
  }

  renderDrawerItem(item) {
    const {isLogin} = this.props;
    if (!isLogin && item.iconName === 'md-power') {
      return null;
    }
    return (
      <Touchable
        key={item.iconName}
        isNativeFeedback
        onPress={() => this.handleDrawerItemPress(item.iconName)}>
        <View style={styles.drawerItem}>
          <Icon name={item.iconName} size={dp(40)} color={Color.TEXT_DARK} />
          <Text style={styles.drawerTitleText}>{item.title}</Text>
        </View>
      </Touchable>
    );
  }

  renderHeader() {
    const {navigation, userInfo, isLogin, themeColor} = this.props;
    return (
      <Touchable
        isWithoutFeedback
        disabled={isLogin}
        onPress={() => navigation.navigate('Login')}>
        <View style={[styles.topContainer, {backgroundColor: themeColor}]}>
          <View>
            {isLogin ? (
              <Image
                source={images.logoIcon}
                style={styles.logo}
                resizeMode={'cover'}
              />
            ) : (
              <View style={styles.myPhoto}>
                <Icon
                  name={'md-person'}
                  size={dp(150)}
                  color={Color.ICON_GRAY}
                />
              </View>
            )}
            <Text style={styles.loginText}>
              {isLogin && userInfo.username
                ? userInfo.username
                : i18n('not-logged-in')}
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
    );
  }

  render() {
    return (
      <View style={globalStyles.container}>
        {this.renderHeader()}
        <View style={{marginTop: dp(28)}}>
          {this.state.drawerData.map(item => this.renderDrawerItem(item))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    height: dp(450),
    width: dp(600),
    paddingTop: dp(130),
    paddingHorizontal: dp(28),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  myPhoto: {
    backgroundColor: Color.WHITE,
    width: dp(200),
    height: dp(200),
    borderRadius: dp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: dp(200),
    height: dp(200),
    borderRadius: dp(100),
    borderWidth: dp(3),
    borderColor: Color.WHITE,
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
    themeColor: state.user.themeColor,
    language: state.user.language,
  };
};

export default connect(mapStateToProps)(DrawerScreen);
