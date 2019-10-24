/**
 * Created by huangjunsheng on 2019-09-16
 */
import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import NavBar from '../../component/NavBar';
import globalStyles from '../../styles/globalStyles';
import {fetchProjectTabs, updateArticleLoading} from '../../actions';
import ArticleTabComponent from '../../component/ArticleTabComponent';
import LoadingView from '../../component/LoadingView';
import {i18n} from '../../utils/Utility';

/**
 * 项目
 */
class ProjectScreen extends PureComponent {
  componentDidMount() {
    updateArticleLoading(true);
    fetchProjectTabs();
  }

  render() {
    const {navigation, projectTabs, isShowLoading} = this.props;
    return (
      <View style={globalStyles.container}>
        <NavBar
          title={i18n('project')}
          navigation={navigation}
          leftIcon="md-person"
          rightIcon="md-search"
          onLeftPress={() => navigation.toggleDrawer()}
          onRightPress={() => navigation.navigate('Search')}
        />
        <ArticleTabComponent
          articleTabs={projectTabs}
          navigation={navigation}
        />
        <LoadingView isShowLoading={isShowLoading} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    projectTabs: state.project.projectTabs,
    isShowLoading: state.wxArticle.isShowLoading,
    language: state.user.language,
  };
};

export default connect(mapStateToProps)(ProjectScreen);
