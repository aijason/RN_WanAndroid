import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import globalStyles from '../../styles/globalStyles';
import NavBar from '../../component/NavBar';
import {fetchOftenUsedWebsites} from '../../actions';
import {DEVICE_WIDTH, getRealDP as dp} from '../../utils/screenUtil';
import Color from '../../utils/Color';
import {getChapterBgColor, i18n} from '../../utils/Utility';
import Touchable from '../../component/Touchable';
import Icon from 'react-native-vector-icons/Ionicons';
import CommonFlatList from '../../component/CommonFlatList';

/**
 * 常用网站
 */
class WebsitesScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
    this.renderItem = this.renderItem.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    fetchOftenUsedWebsites();
  }

  async onRefresh() {
    this.setState({isRefreshing: true});
    await fetchOftenUsedWebsites();
    this.setState({isRefreshing: false});
  }

  renderItem({item}) {
    const {navigation} = this.props;
    return (
      <View style={styles.itemContainer}>
        <Touchable
          style={[
            styles.itemWrapper,
            {backgroundColor: getChapterBgColor(item.id)},
          ]}
          onPress={() =>
            navigation.navigate('WebView', {title: item.name, url: item.link})
          }>
          <Text style={styles.nameText}>{item.name}</Text>
          <Icon name={'md-arrow-forward'} size={dp(40)} color={Color.WHITE} />
        </Touchable>
      </View>
    );
  }

  renderSeparator = () => <View style={{height: dp(30)}} />;

  render() {
    const {navigation, websites} = this.props;
    return (
      <View style={globalStyles.container}>
        <NavBar
          title={i18n('frequently-used-websites')}
          navigation={navigation}
        />
        <CommonFlatList
          data={websites}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderSeparator}
          ListFooterComponent={this.renderSeparator}
          isRefreshing={this.state.isRefreshing}
          toRefresh={this.onRefresh}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
  },
  itemWrapper: {
    width: DEVICE_WIDTH * 0.9,
    flexDirection: 'row',
    backgroundColor: Color.WHITE,
    borderRadius: dp(60),
    paddingVertical: dp(40),
    paddingHorizontal: dp(50),
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: dp(32),
    color: Color.WHITE,
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  return {
    websites: state.home.websites,
    themeColor: state.user.themeColor,
  };
};

export default connect(mapStateToProps)(WebsitesScreen);
