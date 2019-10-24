import React, {PureComponent} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  DEVICE_WIDTH,
  getRealDP as dp,
  getStatusBarHeight,
  isAndroid,
} from '../utils/screenUtil';
import Color from '../utils/Color';
import Touchable from './Touchable';
import images from '../images';

const propTypes = {
  title: PropTypes.string,
  titleView: PropTypes.func,
  leftIcon: PropTypes.string,
  onLeftPress: PropTypes.func,
  rightIcon: PropTypes.string,
  onRightPress: PropTypes.func,
  navigation: PropTypes.object.isRequired,
  navBarStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]),
};
const defaultProps = {
  title: '',
  leftIcon: 'md-arrow-back',
  noStatusBarHeight: false,
  navBarStyle: {},
};

const feedBackBackground = TouchableNativeFeedback.Ripple(
  'rgba(50,50,50,0.3)',
  true,
);

/**
 * NavBar 导航头组件
 */
class NavBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLeftBtnClick = this.handleLeftBtnClick.bind(this);
  }

  handleLeftBtnClick() {
    const {onLeftPress, navigation} = this.props;
    if (onLeftPress && typeof onLeftPress === 'function') {
      return onLeftPress();
    }
    return navigation.goBack();
  }

  render() {
    const {
      leftIcon,
      rightIcon,
      navBarStyle,
      titleView,
      title,
      onRightPress,
      isLogin,
      themeColor,
    } = this.props;
    return (
      <View
        style={[styles.container, {backgroundColor: themeColor}, navBarStyle]}>
        {/* 左侧按钮 */}
        <Touchable
          isNativeFeedback={isAndroid}
          background={feedBackBackground}
          onPress={this.handleLeftBtnClick}>
          <View style={styles.iconWrapper}>
            {leftIcon === 'md-person' && isLogin ? (
              <Image
                source={images.logoIcon}
                style={styles.myPhoto}
                resizeMode={'cover'}
              />
            ) : (
              <Icon name={leftIcon} size={dp(50)} color={Color.WHITE} />
            )}
          </View>
        </Touchable>

        {/* 中间标题 */}
        {titleView ? (
          titleView()
        ) : (
          <View style={styles.titleWrapper}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {title}
            </Text>
          </View>
        )}

        {/* 右侧按钮 */}
        {rightIcon ? (
          <Touchable
            isNativeFeedback={isAndroid}
            background={feedBackBackground}
            onPress={onRightPress}>
            <View style={styles.iconWrapper}>
              <Icon name={rightIcon} size={dp(50)} color={Color.WHITE} />
            </View>
          </Touchable>
        ) : (
          <View style={styles.iconWrapper} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: dp(100) + getStatusBarHeight(),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: getStatusBarHeight(),
    paddingHorizontal: dp(28),
  },
  titleWrapper: {
    width: DEVICE_WIDTH - dp(260),
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: dp(38),
    color: Color.WHITE,
  },
  iconWrapper: {
    height: dp(60),
    width: dp(60),
    borderRadius: dp(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  myPhoto: {
    height: dp(58),
    width: dp(58),
    borderRadius: dp(29),
    borderWidth: dp(2),
    borderColor: Color.WHITE,
  },
});

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    isLogin: state.user.isLogin,
    themeColor: state.user.themeColor,
    language: state.user.language,
  };
};

export default connect(mapStateToProps)(NavBar);
