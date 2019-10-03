/**
 * Created by huangjunsheng on 2019-09-16
 */
import React, {PureComponent} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {connect} from 'react-redux';
import {
  fetchHomeAddCollect,
  fetchHomeBanner,
  fetchHomeCancelCollect,
  fetchHomeList,
  fetchHomeListMore,
} from '../actions';
import NavBar from '../component/NavBar';
import Color from '../utils/Color';
import Banner from '../component/Banner';
import globalStyles from '../styles/globalStyles';
import {getRealDP as dp} from '../utils/screenUtil';
import ListFooter from '../component/ListFooter';
import ArticleItemRow from '../component/ArticleItemRow';
import {showToast} from '../utils/Utility';

/**
 * 首页
 */
class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
    this.renderItem = this.renderItem.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onFetchData = this.onFetchData.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
  }

  async componentDidMount() {
    await this.onFetchData();
  }

  async onFetchData() {
    await Promise.all([fetchHomeBanner(), fetchHomeList()]);
  }

  async onRefresh() {
    this.setState({isRefreshing: true});
    await Promise.all([fetchHomeBanner(), fetchHomeList()]);
    this.setState({isRefreshing: false});
  }

  onEndReached() {
    fetchHomeListMore(this.props.page);
  }

  renderItem({item, index}) {
    const {navigation, isLogin} = this.props;
    return (
      <ArticleItemRow
        navigation={navigation}
        item={item}
        onCollectPress={() => {
          if (!isLogin) {
            showToast('请先登录');
            return navigation.navigate('Login');
          }
          if (item.collect) {
            fetchHomeCancelCollect(item.id, index);
          } else {
            fetchHomeAddCollect(item.id, index);
          }
        }}
      />
    );
  }

  renderHeader() {
    const {navigation, homeBanner} = this.props;
    return (
      <View>
        <Banner bannerArr={homeBanner} navigation={navigation} />
        <View style={{height: dp(20)}} />
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

  render() {
    const {navigation, dataSource, themeColor} = this.props;
    return (
      <View style={globalStyles.container}>
        <NavBar
          title={'玩安卓'}
          navigation={navigation}
          leftIcon="md-person"
          rightIcon="md-search"
          onLeftPress={() => navigation.toggleDrawer()}
          onRightPress={() => navigation.navigate('Search')}
        />
        <FlatList
          data={dataSource}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.2}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh}
              tintColor={themeColor}
              colors={[themeColor]}
              title="玩命加载中..."
              titleColor={Color.TEXT_LIGHT}
            />
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    page: state.home.page,
    dataSource: state.home.dataSource,
    homeBanner: state.home.homeBanner,
    homeList: state.home.homeList,
    isRenderFooter: state.home.isRenderFooter,
    isFullData: state.home.isFullData,
    isLogin: state.user.isLogin,
    themeColor: state.user.themeColor,
  };
};

export default connect(mapStateToProps)(HomeScreen);
