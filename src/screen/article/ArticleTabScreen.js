import React, {PureComponent} from 'react';
import {View} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import NavBar from '../../component/NavBar';
import ArticleTabComponent from '../../component/ArticleTabComponent';
import {updateArticleLoading} from '../../actions';
import LoadingView from '../../component/LoadingView';
import {connect} from 'react-redux';

/**
 * ArticleTabScreen
 */
class ArticleTabScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      articleTabs: [],
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    updateArticleLoading(true);
    const articleTabs = navigation.getParam('articleTabs', []);
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({articleTabs});
    }, 100);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    const {navigation, isShowLoading} = this.props;
    const title = navigation.getParam('title', '');
    return (
      <View style={globalStyles.container}>
        <NavBar title={title} navigation={navigation} />
        <ArticleTabComponent
          articleTabs={this.state.articleTabs}
          navigation={navigation}
        />
        <LoadingView isShowLoading={isShowLoading} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isShowLoading: state.wxArticle.isShowLoading,
  };
};

export default connect(mapStateToProps)(ArticleTabScreen);
