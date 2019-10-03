/**
 * Created by huangjunsheng on 2019-09-16
 */
import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import NavBar from '../component/NavBar';
import Color from '../utils/Color';
import globalStyles from '../styles/globalStyles';
import {fetchProjectTabs} from '../actions';
import ArticleTabComponent from '../component/ArticleTabComponent';

/**
 * 项目
 */
class ProjectScreen extends PureComponent {
  componentDidMount() {
    fetchProjectTabs();
  }

  render() {
    const {navigation, projectTabs} = this.props;
    return (
      <View style={globalStyles.container}>
        <NavBar
          title={'项目'}
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
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    projectTabs: state.project.projectTabs,
  };
};

export default connect(mapStateToProps)(ProjectScreen);
