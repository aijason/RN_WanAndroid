/**
 * Created by huangjunsheng on 2019-09-19
 */
import React, {PureComponent} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import Touchable from './Touchable';
import {DEVICE_WIDTH, getRealDP as dp} from '../utils/screenUtil';
import Color from '../utils/Color';

const propTypes = {
  bannerArr: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
};

const defaultProps = {
  bannerArr: [],
};

/**
 * 首页轮播组件
 */
class Banner extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentBannerIndex: 0,
    };
    this.getCurrentImgIndex = this.getCurrentImgIndex.bind(this);
    this.toShowWebView = this.toShowWebView.bind(this);
  }

  getCurrentImgIndex(imageIndex) {
    this.setState({currentBannerIndex: imageIndex});
  }

  toShowWebView(info) {
    const {navigation} = this.props;
    const {title, url} = info;
    navigation.navigate('WebView', {
      title,
      url,
    });
  }

  render() {
    const {bannerArr} = this.props;
    if (!bannerArr.length) {
      return <View style={styles.defaultBg} />;
    }
    return (
      <View style={styles.bannerContainer}>
        <Swiper
          style={styles.imgCarousel}
          horizontal={true}
          loop={true}
          autoplay={true}
          showsPagination={false}
          removeClippedSubviews={false} // 处理ios切换页面白屏
          onIndexChanged={this.getCurrentImgIndex}>
          {bannerArr.map(el => (
            <Touchable
              key={el.id}
              isWithoutFeedback={true}
              onPress={() => this.toShowWebView(el)}>
              <Image style={styles.imgBanner} source={{uri: el.imagePath}} />
            </Touchable>
          ))}
        </Swiper>
        <View style={styles.bannerHint}>
          <Text style={styles.bannerText} numberOfLines={1}>
            {bannerArr[this.state.currentBannerIndex].title}
          </Text>
          <Text style={styles.bannerText}>
            {this.state.currentBannerIndex + 1}/{bannerArr.length}
          </Text>
        </View>
      </View>
    );
  }
}

const imageHeight = dp(380);
const styles = StyleSheet.create({
  defaultBg: {
    height: imageHeight,
    backgroundColor: Color.DEFAULT_BG,
  },
  bannerContainer: {
    height: imageHeight,
    backgroundColor: Color.DEFAULT_BG,
  },
  imgCarousel: {
    height: imageHeight,
  },
  imgBanner: {
    width: DEVICE_WIDTH,
    height: imageHeight,
    resizeMode: 'stretch',
  },
  bannerHint: {
    flex: 1,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: dp(20),
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: dp(50),
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  bannerText: {
    color: Color.WHITE,
    fontSize: dp(28),
  },
});

Banner.propTypes = propTypes;
Banner.defaultProps = defaultProps;

export default Banner;
