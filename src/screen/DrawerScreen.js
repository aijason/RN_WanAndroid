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
} from 'react-native';
import globalStyles from '../styles/globalStyles';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  getRealDP as dp,
} from '../utils/screenUtil';
import Color from '../utils/Color';
import Touchable from '../component/Touchable';
import Icon from 'react-native-vector-icons/Ionicons';
import images from '../images';
import {connect} from 'react-redux';
import {changeThemeColor, fetchToLogout} from '../actions';
import {getThemeColorDataSource, showToast} from '../utils/Utility';
import {ScrollView} from 'react-navigation';

/**
 * 抽屉
 */
class DrawerScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    // 抽屉item数据源
    this.drawerData = [
      {iconName: 'md-heart', title: '我的收藏'},
      {iconName: 'md-globe', title: '常用网站'},
      {iconName: 'md-color-palette', title: '主题'},
      {iconName: 'md-share', title: '分享'},
      {iconName: 'md-person', title: '关于作者'},
      {iconName: 'md-power', title: '退出登录'},
    ];
    this.renderHeader = this.renderHeader.bind(this);
    this.renderThemeModal = this.renderThemeModal.bind(this);
    this.handleDrawerItemPress = this.handleDrawerItemPress.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
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
        this.setModalVisible(true);
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

  setModalVisible() {
    this.setState({modalVisible: !this.state.modalVisible});
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
                  <Text style={styles.themeColorText}>设置主题</Text>
                </View>
                <ScrollView>
                  {getThemeColorDataSource().map((el, index) => (
                    <Touchable
                      key={index}
                      style={[styles.themeColorItem, {backgroundColor: el}]}
                      onPress={async () => {
                        await changeThemeColor(el);
                        this.setModalVisible();
                      }}
                    />
                  ))}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
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
          {this.drawerData.map(item => this.renderDrawerItem(item))}
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
  },
});

const mapStateToProps = state => {
  return {
    isLogin: state.user.isLogin,
    userInfo: state.user.userInfo,
    themeColor: state.user.themeColor,
  };
};

export default connect(mapStateToProps)(DrawerScreen);
