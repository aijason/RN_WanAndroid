/**
 * Created by huangjunsheng on 2019-09-16
 */
import React, {PureComponent} from 'react';
import {View, Text, FlatList, RefreshControl, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import NavBar from '../component/NavBar';
import Color from '../utils/Color';
import globalStyles from '../styles/globalStyles';
import {fetchGuideData, updateSelectIndex} from '../actions';
import {getRealDP as dp} from '../utils/screenUtil';
import Touchable from '../component/Touchable';
import {getChapterBgColor} from '../utils/Utility';

/**
 * 导航
 */
class GuideScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
    this.renderLeftItem = this.renderLeftItem.bind(this);
    this.renderRightItem = this.renderRightItem.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.handleLeftItemPress = this.handleLeftItemPress.bind(this);
    this.handleScrollToItemByIndex = this.handleScrollToItemByIndex.bind(this);
  }

  componentDidMount() {
    fetchGuideData();
  }

  async onRefresh() {
    this.setState({isRefreshing: true});
    await fetchGuideData();
    this.setState({isRefreshing: false});
  }

  async handleLeftItemPress(index) {
    updateSelectIndex(index);
    this.handleScrollToItemByIndex(this.rightFlatListRef, index);
  }

  _onViewableItemsChanged = value => {
    const {viewableItems} = value;
    const index = viewableItems[0].index;
    updateSelectIndex(index);
    if (!this.leftFlatListRef) {
      return;
    }
    this.handleScrollToItemByIndex(this.leftFlatListRef, index);
  };

  handleScrollToItemByIndex(componentRef, index) {
    if (!componentRef) {
      return;
    }
    componentRef.scrollToIndex({
      animated: true,
      index: index,
      viewOffset: 0,
      viewPosition: 0,
    });
  }

  renderLeftItem({item, index}) {
    const {selectIndex} = this.props;
    return (
      <Touchable
        isPreventDouble={false}
        style={
          selectIndex === index
            ? styles.leftBtnChecked
            : styles.leftBtnUnChecked
        }
        onPress={() => this.handleLeftItemPress(index)}>
        <Text
          style={
            selectIndex === index
              ? styles.leftTextChecked
              : styles.leftTextUnChecked
          }>
          {item.name}
        </Text>
      </Touchable>
    );
  }

  renderRightItem({item}) {
    const {navigation} = this.props;
    return (
      <View style={styles.itemWrapper}>
        <View style={styles.itemContent}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.content}>
            {item.articles.map(el => (
              <View key={el.id} style={{backgroundColor: Color.WHITE}}>
                <Touchable
                  style={[
                    styles.tabItemWrapper,
                    {backgroundColor: getChapterBgColor(el.id)},
                  ]}
                  onPress={() => {
                    navigation.navigate('WebView', {
                      title: el.title,
                      url: el.link,
                    });
                  }}>
                  <Text style={styles.tabItemText}>{el.title}</Text>
                </Touchable>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }

  render() {
    const {navigation, guideData} = this.props;
    //列表滚动变化监听配置
    const VIEWABILITY_CONFIG = {
      minimumViewTime: 0,
      viewAreaCoveragePercentThreshold: 10,
      waitForInteraction: true,
    };
    return (
      <View style={globalStyles.container}>
        <NavBar
          title={'导航'}
          backgroundColor={Color.THEME}
          navigation={navigation}
          leftIcon="md-person"
          rightIcon="md-search"
          onLeftPress={() => navigation.toggleDrawer()}
          onRightPress={() => navigation.navigate('Search')}
        />
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.leftContent}>
            <FlatList
              ref={comp => {
                this.leftFlatListRef = comp;
              }}
              style={{backgroundColor: Color.GUIDE_BG}}
              keyExtractor={(item, index) => index.toString()}
              data={guideData}
              renderItem={this.renderLeftItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={styles.rightContent}>
            <FlatList
              ref={comp => {
                this.rightFlatListRef = comp;
              }}
              data={guideData}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={() => <View style={{height: dp(20)}} />}
              renderItem={this.renderRightItem}
              onViewableItemsChanged={this._onViewableItemsChanged}
              viewabilityConfig={VIEWABILITY_CONFIG}
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
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  itemContent: {
    width: dp(500),
    borderRadius: dp(30),
    backgroundColor: Color.WHITE,
    alignItems: 'center',
    marginBottom: dp(20),
    paddingHorizontal: dp(20),
    paddingTop: dp(20),
    paddingBottom: dp(10),
    justifyContent: 'space-between',
  },
  title: {
    fontSize: dp(32),
    color: Color.TEXT_MAIN,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  content: {
    width: dp(460),
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingTop: dp(20),
  },
  tabItemWrapper: {
    paddingHorizontal: dp(30),
    paddingVertical: dp(10),
    borderRadius: dp(30),
    marginRight: dp(15),
    marginBottom: dp(20),
  },
  tabItemText: {
    fontSize: dp(28),
    color: Color.WHITE,
  },
  leftContent: {
    width: dp(200),
  },
  rightContent: {
    flex: 1,
    width: dp(500),
  },
  leftBtnChecked: {
    height: dp(98),
    width: dp(200),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.WHITE,
  },
  leftBtnUnChecked: {
    height: dp(98),
    width: dp(200),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.GUIDE_BG,
  },
  leftTextChecked: {
    fontSize: dp(26),
    color: Color.THEME,
  },
  leftTextUnChecked: {
    fontSize: dp(26),
    color: Color.TEXT_MAIN,
  },
});

const mapStateToProps = state => {
  return {
    guideData: state.guide.guideData,
    selectIndex: state.guide.selectIndex,
  };
};

export default connect(mapStateToProps)(GuideScreen);
