/**
 * Created by huangjunsheng on 2019-10-16
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
import {switchAPPLanguage} from '../../actions';
import {getI18nText, i18n} from '../../utils/Utility';

/**
 * 多语言设置
 */
class LanguageScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderLanguageItem = this.renderLanguageItem.bind(this);
  }

  renderLanguageItem(item) {
    const {language} = this.props;
    return (
      <Touchable
        isPreventDouble={false}
        style={styles.itemWrapper}
        onPress={() => switchAPPLanguage(item.languageCode)}>
        <Text style={styles.languageText}>{item.language}</Text>
        {language === item.languageCode ? (
          <Icon name={'md-checkmark'} size={dp(50)} color={Color.WX_GREEN} />
        ) : null}
      </Touchable>
    );
  }

  render() {
    const {navigation} = this.props;
    const languages = [
      {language: '简体中文', languageCode: 'zhHans'},
      {language: 'English', languageCode: 'en'},
    ];
    return (
      <View style={globalStyles.container}>
        <NavBar title={i18n(getI18nText().language)} navigation={navigation} />
        {languages.map(el => this.renderLanguageItem(el))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    height: dp(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: dp(28),
    backgroundColor: Color.WHITE,
  },
  languageText: {
    fontSize: dp(30),
    color: Color.TEXT_MAIN,
  },
});

const mapStateToProps = state => {
  return {
    language: state.user.language,
  };
};

export default connect(mapStateToProps)(LanguageScreen);
