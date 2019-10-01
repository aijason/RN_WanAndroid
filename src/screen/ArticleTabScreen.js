import React, {PureComponent} from 'react';
import {View} from 'react-native';
import globalStyles from '../styles/globalStyles';
import NavBar from '../component/NavBar';
import ArticleTabComponent from '../component/ArticleTabComponent';

/**
 * ArticleTabScreen
 */
class ArticleTabScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigation} = this.props;
    const articleTabs = navigation.getParam('articleTabs', []);
    const title = navigation.getParam('title', '');
    return (
      <View style={globalStyles.container}>
        <NavBar title={title} navigation={navigation} />
        <ArticleTabComponent
          articleTabs={articleTabs}
          navigation={navigation}
        />
      </View>
    );
  }
}

export default ArticleTabScreen;
