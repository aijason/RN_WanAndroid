/**
 * Created by huangjunsheng on 2019-09-29
 */
import React, {PureComponent} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import globalStyles from '../styles/globalStyles';
import NavBar from '../component/NavBar';
import {
  fetchCollectArticleList,
  fetchCollectArticleMore,
  fetchMyCollectAddCollect,
  fetchMyCollectCancelCollect,
} from '../actions';
import {getRealDP as dp} from '../utils/screenUtil';
import Color from '../utils/Color';
import {connect} from 'react-redux';
import ArticleItemRow from '../component/ArticleItemRow';
import ListFooter from '../component/ListFooter';

class CollectScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
    this.renderItem = this.renderItem.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
  }

  componentDidMount() {
    fetchCollectArticleList();
  }

  async onRefresh() {
    this.setState({isRefreshing: true});
    await fetchCollectArticleList(this.state.key);
    this.setState({isRefreshing: false});
  }

  onEndReached() {
    const {isFullData} = this.props;
    if (isFullData) {
      return;
    }
    fetchCollectArticleMore(this.props.page);
  }

  renderItem({item, index}) {
    const {navigation} = this.props;
    return (
      <ArticleItemRow
        navigation={navigation}
        item={item}
        onCollectPress={() => {
          if (item.collect) {
            fetchMyCollectCancelCollect(item.id, item.originId, index);
          } else {
            fetchMyCollectAddCollect(item.originId, index);
          }
        }}
      />
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
        <NavBar title={'我的收藏'} navigation={navigation} />
        <FlatList
          data={dataSource}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderItem}
          ListHeaderComponent={() => <View style={{height: dp(20)}} />}
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
    page: state.collect.page,
    dataSource: state.collect.dataSource,
    isRenderFooter: state.collect.isRenderFooter,
    isFullData: state.collect.isFullData,
    themeColor: state.user.themeColor,
  };
};

export default connect(mapStateToProps)(CollectScreen);
