/**
 * Created by huangjunsheng on 2019-10-15
 */
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Color from '../../utils/Color';
import NavBar from '../../component/NavBar';
import globalStyles from '../../styles/globalStyles';
import {getRealDP as dp} from '../../utils/screenUtil';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Touchable from '../../component/Touchable';
import {i18n} from '../../utils/Utility';

/**
 * 设置
 */
class SettingScreen extends PureComponent {
  render() {
    const {navigation, language} = this.props;
    return (
      <View style={globalStyles.container}>
        <NavBar title={i18n('settings')} navigation={navigation} />
        <Touchable
          style={styles.itemWrapper}
          onPress={() => navigation.navigate('Language')}>
          <View style={styles.sideWrapper}>
            <Icon name={'ios-globe'} size={dp(50)} color={Color.TEXT_DARK} />
            <Text style={styles.languageText}>{i18n('language')}</Text>
          </View>
          <View style={styles.sideWrapper}>
            <Text style={styles.settingLanguageText}>
              {language === 'zhHans' ? '简体中文' : 'English'}
            </Text>
            <Icon
              name="md-arrow-forward"
              size={dp(50)}
              color={Color.TEXT_DARK}
            />
          </View>
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    height: dp(100),
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
    marginLeft: dp(10),
  },
  settingLanguageText: {
    fontSize: dp(28),
    color: Color.TEXT_DARK,
    marginRight: dp(10),
  },
});

const mapStateToProps = state => {
  return {
    language: state.user.language,
  };
};

export default connect(mapStateToProps)(SettingScreen);
