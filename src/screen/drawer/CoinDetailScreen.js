/**
 * Created by huangjunsheng on 2019-10-08
 */
import React, {PureComponent} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import globalStyles from '../../styles/globalStyles';
import NavBar from '../../component/NavBar';
import {
  fetchMyCoinInfo,
  fetchMyCoinList,
  fetchMyCoinListMore,
} from '../../actions';
import CommonFlatList from '../../component/CommonFlatList';
import {
  DEVICE_WIDTH,
  getBottomSpace,
  getRealDP as dp,
} from '../../utils/screenUtil';
import ListFooter from '../../component/ListFooter';
import Color from '../../utils/Color';
import {i18n} from '../../utils/Utility';
/**
 * 积分明细列表
 */
class CoinDetailScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  componentDidMount() {
    fetchMyCoinInfo();
    fetchMyCoinList();
  }

  async onRefresh() {
    this.setState({isRefreshing: true});
    await fetchMyCoinList();
    this.setState({isRefreshing: false});
  }

  onEndReached() {
    const {isFullData} = this.props;
    if (isFullData) {
      return;
    }
    fetchMyCoinListMore(this.props.page);
  }

  renderItem({item}) {
    return (
      <View style={styles.itemWrapper}>
        <View>
          <Text style={styles.coinReasonText}>{item.reason}</Text>
          <Text style={styles.coinDescText}>{item.desc}</Text>
        </View>
        <Text style={styles.coinCountText}>{`+${item.coinCount}`}</Text>
      </View>
    );
  }

  renderHeader() {
    const {themeColor, coinCount} = this.props;
    return (
      <View style={[styles.headerWrapper, {backgroundColor: themeColor}]}>
        <Text style={styles.coinText}>{coinCount}</Text>
      </View>
    );
  }

  renderFooter() {
    const {isRenderFooter, isFullData, themeColor} = this.props;
    return (
      <ListFooter
        isRenderFooter={isRenderFooter}
        isFullData={isFullData}
        indicatorColor={themeColor}
      />
    );
  }

  renderSeparator() {
    return (
      <View style={{backgroundColor: Color.WHITE}}>
        <View style={globalStyles.splitLine} />
      </View>
    );
  }

  render() {
    const {navigation, dataSource} = this.props;
    return (
      <View style={styles.container}>
        <NavBar
          title={i18n('points-details')}
          navigation={navigation}
          rightIcon={'md-help-circle-outline'}
          onRightPress={() => {
            navigation.navigate('WebView', {
              title: i18n('points-rule'),
              url: 'https://www.wanandroid.com/blog/show/2653',
            });
          }}
        />
        <CommonFlatList
          data={dataSource}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          ItemSeparatorComponent={this.renderSeparator}
          onEndReached={this.onEndReached}
          isRefreshing={this.state.isRefreshing}
          toRefresh={this.onRefresh}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.DEFAULT_BG,
    marginBottom: getBottomSpace(),
  },
  headerWrapper: {
    height: dp(200),
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinText: {
    fontSize: dp(75),
    fontWeight: 'bold',
    color: Color.WHITE,
  },
  itemWrapper: {
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    backgroundColor: Color.WHITE,
    paddingVertical: dp(28),
    paddingHorizontal: dp(28),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coinCountText: {
    fontSize: dp(30),
    color: Color.WX_GREEN,
    fontWeight: 'bold',
  },
  coinDescText: {
    fontSize: dp(28),
    color: Color.TEXT_DARK,
    marginTop: dp(20),
  },
  coinReasonText: {
    fontSize: dp(30),
    color: Color.TEXT_MAIN,
  },
});

const mapStateToProps = state => {
  return {
    dataSource: state.coin.dataSource,
    isRenderFooter: state.coin.isRenderFooter,
    isFullData: state.coin.isFullData,
    page: state.coin.page,
    coinCount: state.coin.coinCount,
    themeColor: state.user.themeColor,
  };
};

export default connect(mapStateToProps)(CoinDetailScreen);
