/**
 * Created by huangjunsheng on 2019-09-16
 */
import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import NavBar from '../component/NavBar';
import Color from '../utils/Color';
import globalStyles from '../styles/globalStyles';
import {fetchWxArticleTabs} from '../actions';
import ArticleTabComponent from '../component/ArticleTabComponent';

/**
 * 微信公众号
 */
class WxArticleScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetchWxArticleTabs();
  }

  render() {
    const {navigation, articleTabs} = this.props;
    return (
      <View style={globalStyles.container}>
        <NavBar
          title={'公众号'}
          backgroundColor={Color.THEME}
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
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    articleTabs: state.wxArticle.articleTabs,
  };
};

export default connect(mapStateToProps)(WxArticleScreen);
