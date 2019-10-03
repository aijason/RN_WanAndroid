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
    this.state = {
      articleTabs: [],
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
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
    const {navigation} = this.props;
    const title = navigation.getParam('title', '');
    return (
      <View style={globalStyles.container}>
        <NavBar title={title} navigation={navigation} />
        <ArticleTabComponent
          articleTabs={this.state.articleTabs}
          navigation={navigation}
        />
      </View>
    );
  }
}

export default ArticleTabScreen;
