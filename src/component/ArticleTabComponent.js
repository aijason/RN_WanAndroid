import React, {PureComponent} from 'react';
import {createAppContainer} from 'react-navigation';
import PropTypes from 'prop-types';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Color from '../utils/Color';
import {getRealDP as dp} from '../utils/screenUtil';
import ArticleFlatList from './ArticleFlatList';
import {connect} from 'react-redux';

const propTypes = {
  articleTabs: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
  isWxArticle: PropTypes.bool,
};
const defaultProps = {
  articleTabs: [],
  isWxArticle: false,
};

class ArticleTabComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  createTabs() {
    const {articleTabs, navigation, isWxArticle} = this.props;
    let routeConfigMap = {};
    articleTabs.map(
      el =>
        (routeConfigMap[el.name] = {
          screen: () => (
            <ArticleFlatList
              isWxArticle={isWxArticle}
              chapterId={el.id}
              navigation={navigation}
            />
          ),
        }),
    );
    return routeConfigMap;
  }

  render() {
    const {articleTabs, themeColor} = this.props;
    if (!articleTabs.length) {
      return null;
    }
    const TabComponent = createAppContainer(
      createMaterialTopTabNavigator(this.createTabs(), {
        lazy: true,
        swipeEnabled: true,
        animationEnabled: true,
        backBehavior: 'none',
        tabBarOptions: {
          activeTintColor: Color.WHITE,
          inactiveTintColor: Color.TEXT_TAB_INACTIVE,
          scrollEnabled: true,
          tabStyle: {
            height: dp(70),
            width: dp(270),
          },
          labelStyle: {
            fontSize: dp(28),
            paddingBottom: dp(25),
            fontWeight: 'bold',
          },
          indicatorStyle: {
            height: dp(4),
            backgroundColor: Color.WHITE,
            width: dp(100),
            marginLeft: dp(85),
          }, // 下划线样式
          style: {
            backgroundColor: themeColor,
            height: dp(80),
          },
        },
      }),
    );
    return <TabComponent />;
  }
}

ArticleTabComponent.propTypes = propTypes;
ArticleTabComponent.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    themeColor: state.user.themeColor,
  };
};

export default connect(mapStateToProps)(ArticleTabComponent);
