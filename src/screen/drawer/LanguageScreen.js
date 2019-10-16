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
import {getLanguageList, i18n} from '../../utils/Utility';

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
        key={item.languageCode}
        isNativeFeedback
        isPreventDouble={false}
        onPress={() => switchAPPLanguage(item.languageCode)}>
        <View style={styles.itemWrapper}>
          <Text style={styles.languageText}>{item.language}</Text>
          {language === item.languageCode ? (
            <Icon name={'md-checkmark'} size={dp(50)} color={Color.WX_GREEN} />
          ) : null}
        </View>
      </Touchable>
    );
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={globalStyles.container}>
        <NavBar title={i18n('language')} navigation={navigation} />
        {getLanguageList().map(el => this.renderLanguageItem(el))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    height: dp(120),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: dp(28),
    backgroundColor: Color.WHITE,
    borderBottomWidth: dp(1),
    borderBottomColor: Color.SPLIT_LINE,
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
