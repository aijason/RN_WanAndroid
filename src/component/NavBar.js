import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  DEVICE_WIDTH,
  getRealDP as dp,
  getStatusBarHeight,
  isAndroid,
} from '../utils/screenUtil';
import Color from '../utils/Color';
import Touchable from './Touchable';

const propTypes = {
  title: PropTypes.string,
  titleView: PropTypes.func,
  leftIcon: PropTypes.string,
  onLeftPress: PropTypes.func,
  rightIcon: PropTypes.string,
  onRightPress: PropTypes.func,
  backgroundColor: PropTypes.string,
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
  backgroundColor: Color.THEME,
  noStatusBarHeight: false,
  navBarStyle: {},
};

const feedBackBackground = TouchableNativeFeedback.Ripple(
  'rgba(50,50,50,0.3)',
  true,
);

/**
 * 作者：黄俊生
 * 组件名称：NavBar 导航头组件
 * 注意事项：
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
    const {rightIcon, backgroundColor, navBarStyle} = this.props;
    return (
      <View
        style={[
          styles.container,
          {backgroundColor: backgroundColor},
          navBarStyle,
        ]}>
        {/* 左侧按钮 */}
        <Touchable
          isNativeFeedback={isAndroid}
          background={feedBackBackground}
          onPress={this.handleLeftBtnClick}>
          <View style={styles.iconWrapper}>
            <Icon
              name={this.props.leftIcon}
              size={dp(50)}
              color={Color.WHITE}
            />
          </View>
        </Touchable>

        {/* 中间标题 */}
        {this.props.titleView ? (
          this.props.titleView()
        ) : (
          <View style={styles.titleWrapper}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {this.props.title}
            </Text>
          </View>
        )}

        {/* 右侧按钮 */}
        {rightIcon ? (
          <Touchable
            isNativeFeedback={isAndroid}
            background={feedBackBackground}
            onPress={this.props.onRightPress}>
            <View style={styles.iconWrapper}>
              <Icon
                name={this.props.rightIcon}
                size={dp(50)}
                color={Color.WHITE}
              />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

export default NavBar;
