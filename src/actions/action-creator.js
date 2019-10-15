/**
 * Created by huangjunsheng on 2019-09-22
 */
import actionTypes from './actionType';

export function getHomeBannerAction(homeBanner) {
  return {
    type: actionTypes.FETCH_HOME_BANNER,
    homeBanner,
  };
}

export function getHomeListAction(homeList) {
  return {
    type: actionTypes.FETCH_HOME_LIST,
    homeList,
  };
}

export function getHomeListFailureAction() {
  return {
    type: actionTypes.FETCH_HOME_LIST_FAILURE,
  };
}

export function getHomeListMoreAction(homeList) {
  return {
    type: actionTypes.FETCH_HOME_LIST_MORE,
    homeList,
  };
}

export function getToRegisterAction(userInfo) {
  return {
    type: actionTypes.FETCH_TO_REGISTER,
    userInfo,
  };
}

export function getToLoginAction(userInfo) {
  return {
    type: actionTypes.FETCH_TO_LOGIN,
    userInfo,
  };
}

export function getToLoginFailureAction() {
  return {
    type: actionTypes.FETCH_TO_LOGIN_FAILURE,
  };
}

export function getToLogoutAction() {
  return {
    type: actionTypes.FETCH_TO_LOGOUT,
  };
}

export function getChangeThemeColorAction(themeColor) {
  return {
    type: actionTypes.CHANGE_THEME_COLOR,
    themeColor,
  };
}

export function getInitialAuthInfoAction(initialInfo) {
  return {
    type: actionTypes.INITIAL_AUTH_INFO,
    initialInfo,
  };
}

export function getSystemDataAction(systemData) {
  return {
    type: actionTypes.FETCH_TO_SYSTEM_DATA,
    systemData,
  };
}

export function getWxArticleTabsAction(articleTabs) {
  return {
    type: actionTypes.FETCH_WX_ARTICLE_TABS,
    articleTabs,
  };
}

export function getWxArticleListAction(articleList) {
  return {
    type: actionTypes.FETCH_WX_ARTICLE_LIST,
    articleList,
  };
}

export function getGuideDataAction(guideData) {
  return {
    type: actionTypes.FETCH_GUIDE_DATA,
    guideData,
  };
}

export function updateSelectIndexAction(selectIndex) {
  return {
    type: actionTypes.UPDATE_SELECT_INDEX,
    selectIndex,
  };
}

export function getProjectTabsAction(projectTabs) {
  return {
    type: actionTypes.FETCH_PROJECT_TABS,
    projectTabs,
  };
}

export function getArticleLoadingAction(isShowLoading) {
  return {
    type: actionTypes.FETCH_ARTICLE_LOADING,
    isShowLoading,
  };
}

export function getOftenUsedWebsitesAction(websites) {
  return {
    type: actionTypes.FETCH_OFTEN_USED_WEBSITES,
    websites,
  };
}

export function getSearchHotKeyAction(hotKey) {
  return {
    type: actionTypes.FETCH_SEARCH_HOT_KEY,
    hotKey,
  };
}

export function getSearchArticleAction(articleData) {
  return {
    type: actionTypes.FETCH_SEARCH_ARTICLE,
    articleData,
  };
}

export function getSearchArticleMoreAction(articleData) {
  return {
    type: actionTypes.FETCH_SEARCH_ARTICLE_MORE,
    articleData,
  };
}

export function clearSearchArticleAction() {
  return {
    type: actionTypes.CLEAR_SEARCH_ARTICLE,
  };
}

export function getCollectArticleListAction(collectData) {
  return {
    type: actionTypes.FETCH_COLLECT_ARTICLE,
    collectData,
  };
}

export function getCollectArticleMoreAction(collectData) {
  return {
    type: actionTypes.FETCH_COLLECT_ARTICLE_MORE,
    collectData,
  };
}

export function getHomeAddCollectAction(index) {
  return {
    type: actionTypes.FETCH_HOME_ADD_COLLECT,
    index,
  };
}

export function getHomeCancelCollectAction(index) {
  return {
    type: actionTypes.FETCH_HOME_CANCEL_COLLECT,
    index,
  };
}

export function getMyCollectCancelCollectAction(index) {
  return {
    type: actionTypes.FETCH_MYCOLLECT_CANCEL_COLLECT,
    index,
  };
}

export function getMyCollectAddCollectAction(index) {
  return {
    type: actionTypes.FETCH_MYCOLLECT_ADD_COLLECT,
    index,
  };
}

export function getSearchArticleAddCollectAction(index) {
  return {
    type: actionTypes.FETCH_SEARCH_ARTICLE_ADD_COLLECT,
    index,
  };
}

export function getSearchArticleCancelCollectAction(index) {
  return {
    type: actionTypes.FETCH_SEARCH_ARTICLE_CANCEL_COLLECT,
    index,
  };
}

export function getMyCoinListAction(coinList) {
  return {
    type: actionTypes.FETCH_MY_COIN_LIST,
    coinList,
  };
}

export function getMyCoinListMoreAction(coinList) {
  return {
    type: actionTypes.FETCH_MY_COIN_LIST_MORE,
    coinList,
  };
}

export function getMyCoinInfoAction(coinInfo) {
  return {
    type: actionTypes.FETCH_MY_COIN_INFO,
    coinInfo,
  };
}

export function getSwitchAPPLanguageAction(language) {
  return {
    type: actionTypes.SWITCH_APP_LANGUAGE,
    language,
  };
}
