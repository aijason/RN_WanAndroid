import React, {PureComponent} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import globalStyles from '../styles/globalStyles';
import NavBar from '../component/NavBar';
import {
  clearSearchArticle,
  fetchSearchArticle,
  fetchSearchArticleAddCollect,
  fetchSearchArticleCancelCollect,
  fetchSearchArticleMore,
} from '../actions';
import Color from '../utils/Color';
import ArticleItemRow from '../component/ArticleItemRow';
import ListFooter from '../component/ListFooter';
import {getRealDP as dp} from '../utils/screenUtil';

/**
 * 搜索文章结果页
 */
class SearchArticleScreen extends PureComponent {
  constructor(props) {
    super(props);
    const {navigation} = props;
    const key = navigation.getParam('key', '');
    this.state = {
      key,
      isRefreshing: false,
    };
    this.renderItem = this.renderItem.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
  }

  componentDidMount() {
    fetchSearchArticle(this.state.key);
  }

  async onRefresh() {
    this.setState({isRefreshing: true});
    await fetchSearchArticle(this.state.key);
    this.setState({isRefreshing: false});
  }

  onEndReached() {
    const {isFullData} = this.props;
    if (isFullData) {
      return;
    }
    fetchSearchArticleMore(this.state.key, this.props.page);
  }

  renderItem({item, index}) {
    const {navigation} = this.props;
    return (
      <ArticleItemRow
        navigation={navigation}
        item={item}
        onCollectPress={() => {
          if (item.collect) {
            fetchSearchArticleCancelCollect(item.id, index);
          } else {
            fetchSearchArticleAddCollect(item.id, index);
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
        <NavBar
          title={this.state.key}
          navigation={navigation}
          onLeftPress={() => {
            clearSearchArticle();
            navigation.goBack();
          }}
        />
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
    page: state.search.page,
    dataSource: state.search.dataSource,
    isRenderFooter: state.search.isRenderFooter,
    isFullData: state.search.isFullData,
    themeColor: state.user.themeColor,
  };
};

export default connect(mapStateToProps)(SearchArticleScreen);
