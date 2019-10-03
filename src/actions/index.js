/**
 * Created by hjs on 2019-09-17
 */
import {
  getHomeBanner,
  getHomeList,
  getSystemData,
  getWxArticleTabs,
  goToRegister,
  goToLogin,
  goToLogout,
  getGuideData,
  getWxArticleList,
  getProjectTree,
  getOftenUsedWebsites,
  getSearchHotKey,
  getSearchArticle,
  getCollectArticleList,
  addCollectArticle,
  cancelCollectArticle,
} from '../api';
import store from '../store';
import {
  getHomeBannerAction,
  getHomeListAction,
  getHomeListFailureAction,
  getHomeListMoreAction,
  getToRegisterAction,
  getToLoginAction,
  getToLoginFailureAction,
  getToLogoutAction,
  getSystemDataAction,
  getWxArticleTabsAction,
  getWxArticleListAction,
  getGuideDataAction,
  updateSelectIndexAction,
  getProjectTabsAction,
  getOftenUsedWebsitesAction,
  getSearchHotKeyAction,
  getSearchArticleAction,
  getSearchArticleMoreAction,
  clearSearchArticleAction,
  getCollectArticleListAction,
  getCollectArticleMoreAction,
  getHomeAddCollectAction,
  getHomeCancelCollectAction,
  getChangeThemeColorAction,
  getInitialAuthInfoAction,
} from './action-creator';
import {showToast} from '../utils/Utility';
import AuthUtil from '../utils/AuthUtil';

export function fetchHomeBanner() {
  getHomeBanner().then(res => store.dispatch(getHomeBannerAction(res.data)));
}

export async function fetchHomeList() {
  await getHomeList()
    .then(res => store.dispatch(getHomeListAction(res.data)))
    .catch(e => store.dispatch(getHomeListFailureAction()));
}

export function fetchHomeListMore(page) {
  getHomeList(page)
    .then(res => store.dispatch(getHomeListMoreAction(res.data)))
    .catch(e => store.dispatch(getHomeListFailureAction()));
}

export function fetchToRegister(params, navigation) {
  goToRegister(params)
    .then(res => {
      store.dispatch(getToRegisterAction(res.data));
      navigation.goBack();
      showToast('注册成功');
    })
    .catch(e => {
      showToast(e);
    });
}

export function fetchToLogin(params, navigation) {
  goToLogin(params)
    .then(async res => {
      store.dispatch(getToLoginAction(res.data));
      await AuthUtil.saveUserInfo(res.data);
      navigation.goBack();
      showToast('登录成功');
    })
    .catch(e => {
      showToast('登录失败');
      store.dispatch(getToLoginFailureAction());
    });
}

export function fetchToLogout() {
  goToLogout()
    .then(async () => {
      await AuthUtil.removeAllKeys();
      store.dispatch(getToLogoutAction());
    })
    .catch(e => {});
}

export async function changeThemeColor(color) {
  await AuthUtil.saveThemeColor(color);
  store.dispatch(getChangeThemeColorAction(color));
}

export function toInitialAuthInfo(initialInfo) {
  store.dispatch(getInitialAuthInfoAction(initialInfo));
}

export async function fetchSystemData() {
  await getSystemData()
    .then(res => store.dispatch(getSystemDataAction(res.data)))
    .catch(e => {});
}

export function fetchWxArticleTabs() {
  getWxArticleTabs()
    .then(res => store.dispatch(getWxArticleTabsAction(res.data)))
    .catch(e => {});
}

export function fetchWxArticleList(chapterId, page = 1) {
  return new Promise(async (resolve, reject) => {
    await getWxArticleList(chapterId, page)
      .then(res => {
        store.dispatch(getWxArticleListAction(res.data));
        resolve(res.data);
      })
      .catch(e => {
        reject(e);
      });
  });
}

export async function fetchGuideData() {
  await getGuideData()
    .then(res => store.dispatch(getGuideDataAction(res.data)))
    .catch(e => {});
}

export function updateSelectIndex(index) {
  store.dispatch(updateSelectIndexAction(index));
}

export function fetchProjectTabs() {
  getProjectTree()
    .then(res => store.dispatch(getProjectTabsAction(res.data)))
    .catch(e => {});
}

export async function fetchOftenUsedWebsites() {
  await getOftenUsedWebsites()
    .then(res => store.dispatch(getOftenUsedWebsitesAction(res.data)))
    .catch(e => {});
}

export function fetchSearchHotKey() {
  getSearchHotKey()
    .then(res => store.dispatch(getSearchHotKeyAction(res.data)))
    .catch(e => {});
}

export async function fetchSearchArticle(key) {
  await getSearchArticle(key)
    .then(res => store.dispatch(getSearchArticleAction(res.data)))
    .catch(e => {});
}

export function fetchSearchArticleMore(key, page) {
  getSearchArticle(key, page)
    .then(res => store.dispatch(getSearchArticleMoreAction(res.data)))
    .catch(e => {});
}

export function clearSearchArticle() {
  store.dispatch(clearSearchArticleAction());
}

export async function fetchCollectArticleList() {
  await getCollectArticleList()
    .then(res => store.dispatch(getCollectArticleListAction(res.data)))
    .catch(e => {});
}

export function fetchCollectArticleMore(page) {
  getCollectArticleList(page)
    .then(res => store.dispatch(getCollectArticleMoreAction(res.data)))
    .catch(e => {});
}

export function fetchHomeAddCollect(id, index) {
  addCollectArticle(id)
    .then(res => {
      showToast('已收藏');
      store.dispatch(getHomeAddCollectAction(index));
    })
    .catch(e => {});
}

export function fetchHomeCancelCollect(id, index) {
  cancelCollectArticle(id)
    .then(res => store.dispatch(getHomeCancelCollectAction(index)))
    .catch(e => {});
}
