/**
 * Created by huangjunsheng on 2019-09-25
 */
import React, {PureComponent} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {getRealDP as dp} from '../utils/screenUtil';
import Color from '../utils/Color';
import globalStyles from '../styles/globalStyles';
import Touchable from './Touchable';
import Icon from 'react-native-vector-icons/Ionicons';
import {getChapterBgColor, i18n} from '../utils/Utility';

const propTypes = {
  navigation: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  isWxArticle: PropTypes.bool.isRequired, // 公众号文章
  onCollectPress: PropTypes.func.isRequired, // 收藏
};

const defaultProps = {
  isWxArticle: false,
  onCollectPress: () => {},
};

class ArticleItemRow extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {navigation, item, isWxArticle, onCollectPress} = this.props;
    return (
      <Touchable
        style={styles.container}
        onPress={() =>
          navigation.navigate('WebView', {
            title: item.title,
            url: item.link,
          })
        }>
        <View style={styles.itemWrapper}>
          <View style={styles.itemLeftWrapper}>
            <Text numberOfLines={2} style={styles.title}>
              {item.title}
            </Text>
            <Text numberOfLines={3} style={styles.desc}>
              {item.desc}
            </Text>
            <View style={styles.likeTime}>
              <Touchable isPreventDouble={false} onPress={onCollectPress}>
                <Icon
                  name={'md-heart'}
                  size={dp(50)}
                  color={item.collect ? Color.COLLECT : Color.ICON_GRAY}
                />
              </Touchable>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.timeIconWrapper}>
                  <Icon
                    name={'ios-time'}
                    size={dp(50)}
                    color={Color.ICON_GRAY}
                  />
                </View>
                <Text style={styles.dateText}>{item.niceDate}</Text>
                <Text style={[styles.dateText, {marginLeft: dp(20)}]}>
                  {item.author || item.shareUser || item.chapterName}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.itemRightWrapper}>
            {item.envelopePic ? (
              <Image
                style={styles.image}
                source={{uri: item.envelopePic}}
                resizeMode={'stretch'}
              />
            ) : (
              <View style={{backgroundColor: Color.WHITE}}>
                <View
                  style={[
                    globalStyles.circleSpecialWrapper,
                    {
                      backgroundColor: isWxArticle
                        ? Color.WX_GREEN
                        : getChapterBgColor(item.chapterId),
                    },
                  ]}>
                  <Text style={globalStyles.specialText}>
                    {item.superChapterName || i18n('Article')}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  itemWrapper: {
    width: dp(700),
    backgroundColor: Color.WHITE,
    paddingHorizontal: dp(20),
    paddingTop: dp(25),
    paddingBottom: dp(13),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: dp(20),
    borderRadius: dp(20),
  },
  itemLeftWrapper: {
    flex: 1,
    width: dp(520),
    justifyContent: 'space-between',
  },
  itemRightWrapper: {
    justifyContent: 'center',
  },
  image: {
    height: dp(200),
    width: dp(120),
    backgroundColor: Color.ICON_GRAY,
  },
  title: {
    fontSize: dp(28),
    color: Color.TEXT_MAIN,
    fontWeight: 'bold',
    maxWidth: dp(520),
  },
  desc: {
    fontSize: dp(26),
    color: Color.TEXT_DARK,
    marginVertical: dp(12),
    maxWidth: dp(520),
  },
  likeTime: {
    width: dp(520),
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: dp(24),
    color: Color.TEXT_LIGHT,
  },
  timeIconWrapper: {
    marginHorizontal: dp(20),
  },
});

ArticleItemRow.propTypes = propTypes;
ArticleItemRow.defaultProps = defaultProps;

export default ArticleItemRow;
