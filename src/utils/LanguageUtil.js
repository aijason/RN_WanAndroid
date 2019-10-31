/**
 * Created by huangjunsheng on 2019-10-16
 */
import I18n from 'react-native-i18n';
import en from './language/en';
import zhHans from './language/zh-Hans';
import zhHant from './language/zh-Hant';

I18n.defaultLocale = 'zhHans';

I18n.fallbacks = true;

I18n.translations = {
  en,
  zhHans,
  zhHant,
};

export default I18n;
