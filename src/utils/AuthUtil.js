/**
 * Created by hjs on 2019-09-20
 */
import React from 'react';
import StorageUtil from './storageUtil';

const userNameKey = 'userName';
const cookieKey = 'cookie';

class AuthUtil {
  static saveUserName = name => {
    return StorageUtil.save(userNameKey, name);
  };

  static getUserName = () => {
    return StorageUtil.get(userNameKey);
  };

  static removeUser = () => {
    return StorageUtil.delete(userNameKey);
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
}

export default AuthUtil;
