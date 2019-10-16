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
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
  ScrollView,
  DeviceEventEmitter,
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
import {changeThemeColor, fetchToLogout} from '../../actions';
import {
  getDrawerData,
  getThemeColorDataSource,
  i18n,
  showToast,
} from '../../utils/Utility';

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
    this.renderThemeModal = this.renderThemeModal.bind(this);
    this.handleDrawerItemPress = this.handleDrawerItemPress.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
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
      case 'md-trending-up':
        if (!isLogin) {
          navigation.navigate('Login');
          return showToast(i18n('please-login-first'));
        }
        navigation.navigate('CoinDetail');
        break;
      case 'md-heart':
        if (!isLogin) {
          navigation.navigate('Login');
          return showToast(i18n('please-login-first'));
        }
        navigation.navigate('Collect');
        break;
      case 'md-globe':
        navigation.navigate('Websites');
        break;
      case 'md-color-palette':
        this.setModalVisible(true);
        break;
      case 'md-share':
        this.onShare();
        break;
      case 'md-person':
        navigation.navigate('About');
        break;
      case 'md-settings':
        navigation.navigate('Setting');
        break;
      case 'md-power':
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

  setModalVisible() {
    this.setState({
      modalVisible: !this.state.modalVisible,
      isShowIndicator: false,
    });
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

  renderThemeModal() {
    return (
      <Modal
        transparent
        animationType="fade"
        visible={this.state.modalVisible}
        onRequestClose={this.setModalVisible}>
        <TouchableWithoutFeedback onPress={this.setModalVisible}>
          <View style={styles.themeColorWrapper}>
            <TouchableWithoutFeedback>
              <View style={styles.themeColorContent}>
                <View style={styles.themeColorTitle}>
                  <Text style={styles.themeColorText}>
                    {i18n('set-up-themes')}
                  </Text>
                </View>
                <ScrollView>
                  {getThemeColorDataSource().map((el, index) => (
                    <Touchable
                      key={index}
                      style={[
                        styles.themeColorItem,
                        {backgroundColor: el.color},
                      ]}
                      onPress={async () => {
                        this.setState({isShowIndicator: true});
                        await changeThemeColor(el.color);
                        this.setModalVisible();
                      }}>
                      <Text style={styles.themeColorName}>{el.name}</Text>
                    </Touchable>
                  ))}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
            <ActivityIndicator
              style={styles.indicatorStyle}
              size="large"
              color={Color.TEXT_LIGHT}
              animating={this.state.isShowIndicator}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  render() {
    return (
      <View style={globalStyles.container}>
        {this.renderHeader()}
        <View style={{marginTop: dp(28)}}>
          {this.state.drawerData.map(item => this.renderDrawerItem(item))}
        </View>
        {this.renderThemeModal()}
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
  themeColorWrapper: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  themeColorContent: {
    width: DEVICE_WIDTH * 0.8,
    height: DEVICE_HEIGHT * 0.8,
    backgroundColor: Color.WHITE,
    paddingHorizontal: dp(30),
    paddingBottom: dp(30),
  },
  themeColorTitle: {
    paddingVertical: dp(30),
    alignItems: 'center',
    backgroundColor: Color.WHITE,
  },
  themeColorText: {
    color: Color.TEXT_MAIN,
    fontSize: dp(36),
    fontWeight: 'bold',
  },
  themeColorItem: {
    height: dp(100),
    marginBottom: dp(30),
    borderRadius: dp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeColorName: {
    fontSize: dp(28),
    color: Color.WHITE,
    fontWeight: 'bold',
  },
  indicatorStyle: {
    position: 'absolute',
    top: DEVICE_HEIGHT / 2 - dp(100),
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
