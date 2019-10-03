/**
 * Created by hjs on 2019-09-20
 */
import StorageUtil from './storageUtil';

const userInfoKey = '@userInfo';
const cookieKey = '@cookie';
const themeColorKey = '@themeColor';

class AuthUtil {
  static saveThemeColor = color => {
    return StorageUtil.save(themeColorKey, color);
  };

  static getThemeColor = () => {
    return StorageUtil.get(themeColorKey);
  };

  static saveUserInfo = info => {
    return StorageUtil.save(userInfoKey, info);
  };

  static getUserInfo = () => {
    return StorageUtil.get(userInfoKey);
  };

  static removeUser = () => {
    return StorageUtil.delete(userInfoKey);
  };

  static saveCookie(cookie) {
    return StorageUtil.save(cookieKey, cookie);
  }

  static getCookie = () => {
    return StorageUtil.get(cookieKey);
  };

  static removeCookie = () => {
    return StorageUtil.delete(cookieKey);
  };

  static removeAllKeys = async () => {
    return StorageUtil.delete(await StorageUtil.keys());
  };
}

export default AuthUtil;
