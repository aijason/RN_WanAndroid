/**
 * Created by hjs on 2019-09-20
 */
import actionTypes from '../actions/actionType';
import Color from '../utils/Color';

const initialStore = {
  isLogin: false, // 是否已登录
  userInfo: {
    admin: false,
    chapterTops: [],
    collectIds: [],
    email: '',
    icon: '',
    id: '',
    nickname: '',
    password: '',
    publicName: '',
    token: '',
    type: '',
    username: '',
  }, // 用户信息
  themeColor: Color.THEME, // 用户设置APP主题色
  language: 'zhHans', // APP默认语言
};

const user = (state = initialStore, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TO_REGISTER:
      return {
        ...state,
        isLogin: false,
      };
    case actionTypes.FETCH_TO_LOGIN:
      return {
        ...state,
        isLogin: true,
        userInfo: action.userInfo,
      };
    case actionTypes.FETCH_TO_LOGIN_FAILURE:
      return {
        ...state,
        isLogin: false,
      };
    case actionTypes.FETCH_TO_LOGOUT:
      return {
        ...state,
        isLogin: false,
      };
    case actionTypes.CHANGE_THEME_COLOR:
      return {
        ...state,
        themeColor: action.themeColor,
      };
    case actionTypes.INITIAL_AUTH_INFO:
      return {
        ...state,
        ...action.initialInfo,
      };
    case actionTypes.SWITCH_APP_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };
    default:
      return state;
  }
};

export default user;
