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

/**
 * 设置
 */
class SettingScreen extends PureComponent {
  render() {
    const {navigation} = this.props;
    return (
      <View style={globalStyles.container}>
        <NavBar title={'设置'} navigation={navigation} />
        <Touchable
          style={styles.itemWrapper}
          onPress={() => navigation.navigate('Language')}>
          <View style={styles.sideWrapper}>
            <Icon name={'ios-globe'} size={dp(50)} color={Color.TEXT_DARK} />
            <Text style={styles.languageText}>多语言</Text>
          </View>
          <View style={styles.sideWrapper}>
            <Text style={styles.settingLanguageText}>简体中文</Text>
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
    themeColor: state.user.themeColor,
  };
};

export default connect(mapStateToProps)(SettingScreen);
