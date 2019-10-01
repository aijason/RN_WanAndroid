import React, {PureComponent} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import PropTypes from 'prop-types';
import globalStyles from '../styles/globalStyles';
import Color from '../utils/Color';
import {fetchWxArticleList} from '../actions';
import {getRealDP as dp} from '../utils/screenUtil';
import ArticleItemRow from './ArticleItemRow';

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
    };
    this.page = 1;
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
        this.setState({dataSource: res.datas, isRefreshing: false});
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
        this.setState({dataSource: dataSource.concat(res.datas)});
      })
      .catch(e => {
        this.setState({isRefreshing: false});
      });
  }

  renderItem({item}) {
    const {navigation, isWxArticle} = this.props;
    return (
      <ArticleItemRow
        isWxArticle={isWxArticle}
        item={item}
        navigation={navigation}
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
        <FlatList
          data={dataSource}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderItem}
          ListHeaderComponent={() => <View style={{height: dp(20)}} />}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.2}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh}
              tintColor={Color.THEME}
              colors={[Color.THEME]}
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

export default ArticleFlatList;
