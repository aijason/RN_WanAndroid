/**
 * Created by huangjunsheng on 2019-09-16
 */
import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import NavBar from '../../component/NavBar';
import Color from '../../utils/Color';
import globalStyles from '../../styles/globalStyles';
import {fetchWxArticleTabs, updateArticleLoading} from '../../actions';
import ArticleTabComponent from '../../component/ArticleTabComponent';
import LoadingView from '../../component/LoadingView';
import {i18n} from '../../utils/Utility';

/**
 * 微信公众号
 */
class WxArticleScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    updateArticleLoading(true);
    fetchWxArticleTabs();
  }

  render() {
    const {navigation, articleTabs, isShowLoading} = this.props;
    return (
      <View style={globalStyles.container}>
        <NavBar
          title={i18n('publicAccount')}
          navigation={navigation}
          leftIcon="md-person"
          rightIcon="md-search"
          onLeftPress={() => navigation.toggleDrawer()}
          onRightPress={() => navigation.navigate('Search')}
        />
        <ArticleTabComponent
          isWxArticle={true}
          articleTabs={articleTabs}
          navigation={navigation}
        />
        <LoadingView isShowLoading={isShowLoading} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    articleTabs: state.wxArticle.articleTabs,
    isShowLoading: state.wxArticle.isShowLoading,
    language: state.user.language,
  };
};

export default connect(mapStateToProps)(WxArticleScreen);
