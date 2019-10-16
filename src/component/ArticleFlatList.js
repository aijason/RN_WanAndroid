import React, {PureComponent} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import globalStyles from '../styles/globalStyles';
import {fetchWxArticleList, updateArticleLoading} from '../actions';
import {getRealDP as dp} from '../utils/screenUtil';
import ArticleItemRow from './ArticleItemRow';
import {connect} from 'react-redux';
import {addCollectArticle, cancelCollectArticle} from '../api';
import {i18n, showToast} from '../utils/Utility';
import ListFooter from './ListFooter';
import CommonFlatList from './CommonFlatList';

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
      isRenderFooter: true,
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
        updateArticleLoading(false);
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
          isRenderFooter: !!res.total, // 只有total为0是不渲染footer
          isFullData: res.curPage === res.pageCount,
        });
      })
      .catch(e => {
        this.setState({isRefreshing: false});
      });
  }

  onEndReached() {
    const {chapterId} = this.props;
    const {dataSource, isFullData} = this.state;
    if (isFullData) {
      return;
    }
    fetchWxArticleList(chapterId, ++this.page)
      .then(res => {
        this.setState({
          dataSource: dataSource.concat(res.datas),
          isRenderFooter: true,
          isFullData: !res.datas.length,
        });
      })
      .catch(e => {
        this.setState({isRefreshing: false});
      });
  }

  renderFooter() {
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
            showToast(i18n('please-login-first'));
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
                showToast(i18n('Have been collected'));
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
    const {dataSource} = this.state;
    if (!dataSource.length) {
      return null;
    }
    return (
      <View style={globalStyles.container}>
        <CommonFlatList
          data={dataSource}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderItem}
          ListHeaderComponent={() => <View style={{height: dp(20)}} />}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.onEndReached}
          isRefreshing={this.state.isRefreshing}
          toRefresh={this.onRefresh}
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
