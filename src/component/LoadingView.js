/**
 * Created by huangjunsheng on 2019-10-04
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  getRealDP as dp,
} from '../utils/screenUtil';
import Color from '../utils/Color';
import {i18n} from '../utils/Utility';

const propTypes = {
  isShowLoading: PropTypes.bool.isRequired,
};

const defaultProps = {
  isShowLoading: false,
};

class LoadingView extends Component {
  render() {
    const {isShowLoading} = this.props;
    if (!isShowLoading) {
      return null;
    }
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingWrapper}>
          <View style={styles.loadingContent}>
            <ActivityIndicator size="large" color={Color.WHITE} />
            <Text style={styles.loadingText}>{i18n('Loading')}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'transparent',
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingWrapper: {
    width: dp(200),
    height: dp(200),
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  loadingContent: {
    width: dp(200),
    height: dp(200),
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  loadingText: {
    marginLeft: dp(20),
    color: Color.WHITE,
    marginTop: dp(20),
    fontSize: dp(28),
  },
});

LoadingView.propTypes = propTypes;
LoadingView.defaultProps = defaultProps;

export default LoadingView;
