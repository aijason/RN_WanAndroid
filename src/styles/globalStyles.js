/**
 * Created by huangjunsheng on 2019-09-20
 */
import {StyleSheet} from 'react-native';
import Color from '../utils/Color';
import {DEVICE_WIDTH, getRealDP as dp} from '../utils/screenUtil';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.DEFAULT_BG,
  },
  splitLine: {
    height: dp(1),
    width: DEVICE_WIDTH - dp(56),
    marginLeft: dp(28),
    backgroundColor: Color.SPLIT_LINE,
  },
  circleSpecialWrapper: {
    width: dp(120),
    height: dp(120),
    borderRadius: dp(60),
    justifyContent: 'center',
    alignItems: 'center',
    padding: dp(10),
  },
  specialText: {
    fontSize: dp(20),
    color: Color.WHITE,
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: dp(23),
  },
  articleTitle: {
    fontSize: dp(28),
    color: Color.TEXT_MAIN,
    fontWeight: 'bold',
  },
});
