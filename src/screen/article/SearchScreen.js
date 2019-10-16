import React, {PureComponent} from 'react';
import {View, TextInput, StyleSheet, Text, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import globalStyles from '../../styles/globalStyles';
import NavBar from '../../component/NavBar';
import {DEVICE_WIDTH, getRealDP as dp} from '../../utils/screenUtil';
import Color from '../../utils/Color';
import {fetchSearchHotKey} from '../../actions';
import {getChapterBgColor, i18n, showToast} from '../../utils/Utility';
import Touchable from '../../component/Touchable';

/**
 * SearchScreen
 */
class SearchScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: '',
    };
  }

  componentDidMount() {
    fetchSearchHotKey();
  }

  render() {
    const {navigation, hotKey} = this.props;
    return (
      <View style={globalStyles.container}>
        <NavBar
          navigation={navigation}
          titleView={() => (
            <View style={styles.textInputWrapper}>
              <TextInput
                style={styles.textInputStyle}
                placeholder={`  ${i18n('search-for-more-dry-goods')}`}
                placeholderTextColor={Color.WHITE}
                selectionColor={Color.WHITE}
                autoFocus
                onChangeText={searchKey => {
                  this.setState({searchKey});
                }}
              />
            </View>
          )}
          rightIcon={'md-search'}
          onRightPress={() => {
            Keyboard.dismiss();
            if (!this.state.searchKey) {
              return showToast(i18n('please-enter-search-keywords'));
            }
            navigation.navigate('SearchArticle', {key: this.state.searchKey});
          }}
        />
        <View style={styles.hotKeyTitleWrapper}>
          <Icon name={'md-flame'} size={dp(50)} color={Color.RED} />
          <Text style={styles.hotKeyTitleText}>{i18n('popular-search')}</Text>
        </View>
        <View style={styles.hotKeyWrapper}>
          {hotKey.map(el => (
            <Touchable
              key={el.id}
              onPress={() =>
                navigation.navigate('SearchArticle', {key: el.name})
              }
              style={[
                styles.hotKeyItem,
                {backgroundColor: getChapterBgColor(el.id)},
              ]}>
              <Text style={styles.hotKeyText}>{el.name}</Text>
            </Touchable>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInputWrapper: {
    width: DEVICE_WIDTH - dp(260),
  },
  textInputStyle: {
    fontSize: dp(32),
    color: Color.WHITE,
    padding: 0,
  },
  hotKeyTitleWrapper: {
    height: dp(100),
    paddingHorizontal: dp(28),
    alignItems: 'center',
    flexDirection: 'row',
  },
  hotKeyTitleText: {
    fontSize: dp(38),
    color: Color.TEXT_MAIN,
    marginLeft: dp(15),
  },
  hotKeyWrapper: {
    paddingHorizontal: dp(28),
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  hotKeyItem: {
    paddingHorizontal: dp(30),
    paddingVertical: dp(15),
    borderRadius: dp(35),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: dp(20),
    marginBottom: dp(20),
  },
  hotKeyText: {
    fontSize: dp(30),
    color: Color.WHITE,
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  return {
    hotKey: state.search.hotKey,
    themeColor: state.user.themeColor,
  };
};

export default connect(mapStateToProps)(SearchScreen);
