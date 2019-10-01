import React, {PureComponent} from 'react';
import {ProgressBarAndroid, ProgressViewIOS} from 'react-native';
import PropTypes from 'prop-types';
import {getRealDP as dp, isAndroid} from '../utils/screenUtil';
import Color from '../utils/Color';

const propTypes = {
  progress: PropTypes.number.isRequired,
};
const defaultProps = {
  progress: 0,
};

/**
 * 作者：黄俊生
 * 组件名称：ProgressBar 用于WebView展示时上方进度条
 * 注意事项：
 */
class ProgressBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {progress} = this.props;
    if (progress === 1) {
      return null;
    }
    if (isAndroid) {
      return (
        <ProgressBarAndroid
          style={{height: dp(10), backgroundColor: Color.WHITE}}
          styleAttr="Horizontal"
          color={Color.THEME}
          progress={progress}
        />
      );
    }
    return (
      <ProgressViewIOS
        trackTintColor={Color.WHITE}
        progressTintColor={Color.THEME}
        progress={progress}
      />
    );
  }
}

ProgressBar.propTypes = propTypes;
ProgressBar.defaultProps = defaultProps;

export default ProgressBar;
