import React, {PureComponent} from 'react';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {isAndroid} from '../utils/screenUtil';

const propTypes = {
  isHighlight: PropTypes.bool, // 用于使用TouchableHighlight组件
  isNativeFeedback: PropTypes.bool, // 仅用于安卓平台，设置原生触摸响应效果
  isWithoutFeedback: PropTypes.bool, // 用于使用TouchableWithoutFeedback组件, 不推荐使用
  children: PropTypes.node,
  activeOpacity: PropTypes.number, // 用于TouchableOpacity和TouchableHighlight组件，设置触摸响应时不透明度
  underlayColor: PropTypes.string, // 仅用于TouchableHighlight组件，设置触摸响应时底层颜色
  onPress: PropTypes.func.isRequired, // 当触摸操作结束时调用, 处理触摸响应事件
  isPreventDouble: PropTypes.bool, // 是否开启防重复点击(加减计数，筛选器，选择器，展开收起等情况需禁用防重，设置为false)
};

const defaultProps = {
  isHighlight: false,
  isNativeFeedback: false,
  isWithoutFeedback: false,
  children: null,
  activeOpacity: 0.85,
  underlayColor: '#e6e6e6',
  onPress: () => {},
  isPreventDouble: true,
};

const preventDoublePress = {
  lastPressTime: 1,
  onPress(callback) {
    const curTime = new Date().getTime();
    if (curTime - this.lastPressTime > 500) {
      this.lastPressTime = curTime;
      callback();
    }
  },
};

/**
 * 组件名称：防重复点击触摸组件
 * 注意事项：默认使用TouchableOpacity组件效果
 * */
class Touchable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.onPreventDoublePress = this.onPreventDoublePress.bind(this);
  }

  /**
   * 防重复点击处理事件
   * */
  onPreventDoublePress() {
    const {onPress, isPreventDouble} = this.props;
    if (!onPress) {
      return;
    }
    if (isPreventDouble) {
      preventDoublePress.onPress(onPress);
    } else {
      onPress();
    }
  }

  render() {
    const {
      children,
      isHighlight,
      isNativeFeedback,
      isWithoutFeedback,
      activeOpacity,
      underlayColor,
    } = this.props;

    /** TouchableHighlight 触摸底色高亮响应效果 */
    if (isHighlight) {
      return (
        <TouchableHighlight
          {...this.props}
          underlayColor={underlayColor}
          onPress={this.onPreventDoublePress}>
          {children}
        </TouchableHighlight>
      );
    }

    /** TouchableNativeFeedback Android原生触摸响应效果 */
    if (isAndroid && isNativeFeedback) {
      return (
        <TouchableNativeFeedback
          delayPressIn={0}
          background={TouchableNativeFeedback.SelectableBackground()}
          {...this.props}
          onPress={this.onPreventDoublePress}>
          {children}
        </TouchableNativeFeedback>
      );
    }

    /** TouchableWithoutFeedback 无视觉反馈触摸响应效果, 建议少使用 */
    if (isWithoutFeedback) {
      return (
        <TouchableWithoutFeedback
          {...this.props}
          onPress={this.onPreventDoublePress}>
          {children}
        </TouchableWithoutFeedback>
      );
    }

    /** TouchableOpacity Android/IOS双平台默认触摸响应效果 */
    return (
      <TouchableOpacity
        {...this.props}
        activeOpacity={activeOpacity}
        onPress={this.onPreventDoublePress}>
        {children}
      </TouchableOpacity>
    );
  }
}

Touchable.propTypes = propTypes;
Touchable.defaultProps = defaultProps;

export default Touchable;
