/**
 * Created by huangjunsheng on 2019-10-15
 */
import React, {PureComponent} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import Color from '../../utils/Color';
import NavBar from '../../component/NavBar';
import globalStyles from '../../styles/globalStyles';
import {getRealDP as dp} from '../../utils/screenUtil';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Touchable from '../../component/Touchable';
import {
  getLanguageList,
  getThemeColorDataSource,
  i18n,
} from '../../utils/Utility';
import {changeThemeColor} from '../../actions';

/**
 * 设置
 */
class SettingScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowThemeColorView: false,
      isShowIndicator: false,
      rotation: new Animated.Value(0),
    };
  }

  render() {
    const {isShowThemeColorView} = this.state;
    const {navigation, language, themeColor} = this.props;
    const currentLanguage = getLanguageList().find(
      el => el.languageCode === language,
    );
    return (
      <View style={globalStyles.container}>
        <NavBar title={i18n('settings')} navigation={navigation} />
        {/* 主题 */}
        <Touchable
          isPreventDouble={false}
          isNativeFeedback
          onPress={() => {
            this.setState({isShowThemeColorView: !isShowThemeColorView});
            if (isShowThemeColorView) {
              Animated.timing(this.state.rotation, {
                toValue: 0,
                duration: 200,
              }).start();
            } else {
              Animated.timing(this.state.rotation, {
                toValue: 1,
                duration: 200,
              }).start();
            }
          }}>
          <View style={styles.itemWrapper}>
            <View style={styles.sideWrapper}>
              <Icon
                name={'ios-color-palette'}
                size={dp(50)}
                color={Color.TEXT_DARK}
              />
              <Text style={styles.languageText}>{i18n('theme-color')}</Text>
            </View>
            <View style={styles.sideWrapper}>
              <View style={[styles.themeView, {backgroundColor: themeColor}]} />
              <Animated.View
                style={{
                  transform: [
                    {
                      rotateZ: this.state.rotation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '180deg'],
                      }),
                    },
                  ],
                }}>
                <Icon
                  name="ios-arrow-down"
                  size={dp(50)}
                  color={Color.TEXT_DARK}
                />
              </Animated.View>
            </View>
          </View>
        </Touchable>
        {/* 展开主题色 */}
        {isShowThemeColorView ? (
          <View style={styles.themeColorWrapper}>
            {getThemeColorDataSource().map(el => (
              <Touchable
                key={el.color}
                activeOpacity={0.5}
                onPress={async () => {
                  this.setState({isShowIndicator: true});
                  await changeThemeColor(el.color);
                  this.setState({isShowIndicator: false});
                }}
                style={[styles.themeItemView, {backgroundColor: el.color}]}
              />
            ))}
          </View>
        ) : null}
        <View style={globalStyles.splitLine} />
        {/* 多语言 */}
        <Touchable
          isNativeFeedback
          onPress={() => navigation.navigate('Language')}>
          <View style={styles.itemWrapper}>
            <View style={styles.sideWrapper}>
              <Icon name={'ios-globe'} size={dp(50)} color={Color.TEXT_DARK} />
              <Text style={styles.languageText}>{i18n('language')}</Text>
            </View>
            <View style={styles.sideWrapper}>
              <Text style={styles.settingLanguageText}>
                {currentLanguage.language}
              </Text>
              <Icon
                name="md-arrow-forward"
                size={dp(50)}
                color={Color.TEXT_DARK}
              />
            </View>
          </View>
        </Touchable>
        <ActivityIndicator
          size="large"
          color={Color.TEXT_LIGHT}
          animating={this.state.isShowIndicator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    height: dp(120),
    paddingHorizontal: dp(28),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.WHITE,
  },
  sideWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    fontSize: dp(32),
    color: Color.TEXT_MAIN,
    marginLeft: dp(15),
  },
  settingLanguageText: {
    fontSize: dp(28),
    color: Color.TEXT_DARK,
    marginRight: dp(15),
  },
  themeView: {
    width: dp(40),
    height: dp(40),
    marginRight: dp(15),
  },
  themeItemView: {
    width: dp(70),
    height: dp(70),
    marginRight: dp(15),
    marginBottom: dp(15),
  },
  themeColorWrapper: {
    paddingHorizontal: dp(28),
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: Color.WHITE,
    paddingTop: dp(15),
  },
});

const mapStateToProps = state => {
  return {
    language: state.user.language,
    themeColor: state.user.themeColor,
  };
};

export default connect(mapStateToProps)(SettingScreen);
