import React, {PureComponent} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import PropTypes from 'prop-types';
import globalStyles from '../styles/globalStyles';
import Color from '../utils/Color';
import {fetchWxArticleList} from '../actions';
import {getRealDP as dp} from '../utils/screenUtil';
import ArticleItemRow from './ArticleItemRow';
import {connect} from 'react-redux';
import {addCollectArticle, cancelCollectArticle} from '../api';
import {showToast} from '../utils/Utility';
import store from '../store';
import {
  getHomeAddCollectAction,
  getHomeCancelCollectAction,
} from '../actions/action-creator';
import ListFooter from './ListFooter';

const propTypes = {
  chapterId: PropTypes.number.isRequired,
  navigation: PropTypes.object.isRequired,
  isWxArticle: PropTypes.bool,
};

const defaultProps = {
  isWxArticle: false,
};

/**
 * ArticleFlatList
 */
class ArticleFlatList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      dataSource: [],
      isRenderFooter: false,
      isFullData: false,
    };
    this.page = 1;
    this.renderFooter = this.renderFooter.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
  }

  componentDidMount() {
    const {chapterId} = this.props;
    fetchWxArticleList(chapterId)
      .then(res => {
        this.setState({dataSource: res.datas});
      })
      .catch(e => {});
  }

  onRefresh() {
    const {chapterId} = this.props;
    this.page = 1;
    this.setState({isRefreshing: true});
    fetchWxArticleList(chapterId)
      .then(res => {
        this.setState({
          dataSource: res.datas,
          isRefreshing: false,
          isRenderFooter: !!res.data.total, // 只有total为0是不渲染footer
          isFullData: res.data.curPage === res.data.pageCount,
        });
      })
      .catch(e => {
        this.setState({isRefreshing: false});
      });
  }

  onEndReached() {
    const {chapterId} = this.props;
    const {dataSource} = this.state;
    fetchWxArticleList(chapterId, ++this.page)
      .then(res => {
        this.setState({
          dataSource: dataSource.concat(res.datas),
          isRenderFooter: true,
          isFullData: !res.data.datas.length,
        });
      })
      .catch(e => {
        this.setState({isRefreshing: false});
      });
  }

  renderFooter() {
    const {isRenderFooter, isFullData} = this.state;
    const {themeColor} = this.props;
    return (
      <ListFooter
        isRenderFooter={this.state.isRenderFooter}
        isFullData={this.state.isFullData}
        indicatorColor={themeColor}
      />
    );
  }

  renderItem({item, index}) {
    const {navigation, isWxArticle, isLogin} = this.props;
    return (
      <ArticleItemRow
        isWxArticle={isWxArticle}
        item={item}
        navigation={navigation}
        onCollectPress={() => {
          if (!isLogin) {
            showToast('请先登录');
            return navigation.navigate('Login');
          }
          if (item.collect) {
            cancelCollectArticle(item.id)
              .then(res => {
                let addCollectDataSource = [...this.state.dataSource];
                addCollectDataSource[index].collect = false;
                this.setState({dataSource: addCollectDataSource});
              })
              .catch(e => {});
          } else {
            addCollectArticle(item.id)
              .then(res => {
                showToast('已收藏');
                let addCollectDataSource = [...this.state.dataSource];
                addCollectDataSource[index].collect = true;
                this.setState({dataSource: addCollectDataSource});
              })
              .catch(e => {});
          }
        }}
      />
    );
  }

  render() {
    const {themeColor} = this.props;
    const {dataSource} = this.state;
    if (!dataSource.length) {
      return null;
    }
    return (
      <View style={globalStyles.container}>
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

ArticleFlatList.propTypes = propTypes;
ArticleFlatList.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    themeColor: state.user.themeColor,
    isLogin: state.user.isLogin,
  };
};

export default connect(mapStateToProps)(ArticleFlatList);
