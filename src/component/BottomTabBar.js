/**
 * Created by huangjunsheng on 2019-10-02
 */
import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableNativeFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {DEVICE_WIDTH, getRealDP as dp, isAndroid} from '../utils/screenUtil';
import Color from '../utils/Color';

class BottomTabBar extends PureComponent {
  render() {
    const {route, focused, themeColor} = this.props;
    const {routeName} = route;
    let tabBarLabel, tabBarIconName, tabBarIconSize;
    switch (routeName) {
      case 'Home':
        tabBarLabel = '首页';
        tabBarIconName = 'ios-home';
        tabBarIconSize = dp(50);
        break;
      case 'System':
        tabBarLabel = '体系';
        tabBarIconName = 'ios-school';
        tabBarIconSize = dp(55);
        break;
      case 'WxArticle':
        tabBarLabel = '公众号';
        tabBarIconName = 'ios-people';
        tabBarIconSize = dp(64);
        break;
      case 'Guide':
        tabBarLabel = '导航';
        tabBarIconName = 'ios-rocket';
        tabBarIconSize = dp(50);
        break;
      default:
        tabBarLabel = '项目';
        tabBarIconName = 'ios-paper';
        tabBarIconSize = dp(50);
        break;
    }
    const tabBarColor = focused ? themeColor : Color.TEXT_LIGHT;
    const content = (
      <View style={styles.tabBarWrapper}>
        <View style={{
          width: dp(65),
          height: dp(65),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name={tabBarIconName} size={tabBarIconSize} color={tabBarColor} />
        </View>
        <Text style={[styles.tabBarLabel, {color: tabBarColor}]}>
          {tabBarLabel}
        </Text>
      </View>
    );
    if (isAndroid) {
      return (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(
            'rgba(50,50,50,0.1)',
            true,
          )}
          {...this.props}>
          {content}
        </TouchableNativeFeedback>
      );
    }
    return (
      <TouchableOpacity activeOpacity={0.8} {...this.props}>
        {content}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    width: DEVICE_WIDTH / 5,
    height: dp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarLabel: {
    fontSize: dp(20),
  },
});

const mapStateToProps = state => {
  return {
    themeColor: state.user.themeColor,
  };
};

export default connect(mapStateToProps)(BottomTabBar);
