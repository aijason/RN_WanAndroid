/**
 * Created by huangjunsheng on 2019-09-16
 */
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import NavBar from '../../component/NavBar';
import Color from '../../utils/Color';
import globalStyles from '../../styles/globalStyles';
import {fetchSystemData} from '../../actions';
import {getRealDP as dp} from '../../utils/screenUtil';
import {getChapterBgColor, i18n} from '../../utils/Utility';
import Touchable from '../../component/Touchable';
import CommonFlatList from '../../component/CommonFlatList';

/**
 * 知识体系
 */
class SystemScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
    this.onRefresh = this.onRefresh.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    fetchSystemData();
  }

  async onRefresh() {
    this.setState({isRefreshing: true});
    await fetchSystemData();
    this.setState({isRefreshing: false});
  }

  renderItem({item}) {
    const {navigation} = this.props;
    return (
      <Touchable
        onPress={() => {
          navigation.navigate('ArticleTab', {
            articleTabs: item.children,
            title: item.name,
          });
        }}>
        <View style={styles.itemWrapper}>
          <View style={styles.itemContent}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.content}>
              <View style={styles.leftContent}>
                {item.children.map(el => (
                  <View key={el.id} style={{backgroundColor: Color.WHITE}}>
                    <View
                      style={[
                        styles.tabItemWrapper,
                        {backgroundColor: getChapterBgColor(el.id)},
                      ]}>
                      <Text style={styles.tabItemText}>{el.name}</Text>
                    </View>
                  </View>
                ))}
              </View>
              <Icon
                name={'md-arrow-forward'}
                size={dp(40)}
                color={Color.TEXT_MAIN}
              />
            </View>
          </View>
        </View>
      </Touchable>
    );
  }

  render() {
    const {navigation, systemData} = this.props;
    return (
      <View style={globalStyles.container}>
        <NavBar
          title={i18n('system')}
          navigation={navigation}
          leftIcon="md-person"
          rightIcon="md-search"
          onLeftPress={() => navigation.toggleDrawer()}
          onRightPress={() => navigation.navigate('Search')}
        />
        <CommonFlatList
          data={systemData}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderItem}
          ListHeaderComponent={() => <View style={{height: dp(20)}} />}
          isRefreshing={this.state.isRefreshing}
          toRefresh={this.onRefresh}
        />
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
    width: dp(700),
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    width: dp(620),
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
});

const mapStateToProps = state => {
  return {
    systemData: state.system.systemData,
    themeColor: state.user.themeColor,
    language: state.user.language,
  };
};

export default connect(mapStateToProps)(SystemScreen);
