import React, {PureComponent} from 'react';
import {ProgressBarAndroid, ProgressViewIOS} from 'react-native';
import PropTypes from 'prop-types';
import {getRealDP as dp, isAndroid} from '../utils/screenUtil';
import Color from '../utils/Color';
import {connect} from 'react-redux';

const propTypes = {
  progress: PropTypes.number.isRequired,
};
const defaultProps = {
  progress: 0,
};

/**
 * ProgressBar 用于WebView展示时上方进度条
 */
class ProgressBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {progress, themeColor} = this.props;
    if (progress === 1) {
      return null;
    }
    if (isAndroid) {
      return (
        <ProgressBarAndroid
          style={{height: dp(10), backgroundColor: Color.WHITE}}
          styleAttr="Horizontal"
          color={themeColor}
          progress={progress}
        />
      );
    }
    return (
      <ProgressViewIOS
        trackTintColor={Color.WHITE}
        progressTintColor={themeColor}
        progress={progress}
      />
    );
  }
}

ProgressBar.propTypes = propTypes;
ProgressBar.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    themeColor: state.user.themeColor,
  };
};

export default connect(mapStateToProps)(ProgressBar);
