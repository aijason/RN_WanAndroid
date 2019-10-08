/**
 * Created by hjs on 2019-09-17
 */
import httpUtil from '../utils/httpUtil';

// 首页轮播
export async function getHomeBanner() {
  return await httpUtil.get('banner/json');
}

// 首页文章列表
export function getHomeList(page = 0) {
  return httpUtil.get(`article/list/${page}/json`);
}

// 首页文章收藏 id:文章id
export function addCollectArticle(id) {
  return httpUtil.post(`lg/collect/${id}/json`, {id});
}

// 首页文章取消收藏 id:文章id
export function cancelCollectArticle(id) {
  return httpUtil.post(`lg/uncollect_originId/${id}/json`, {id});
}

/**
 * 我的收藏页-取消收藏
 * @param id:拼接在链接上
 * @param originId:列表页下发，无则为-1
 */
export function cancelMyCollectArticle(id, originId = -1) {
  return httpUtil.post(`lg/uncollect/${id}/json`, {id, originId});
}

/**
 * 注册
 * @params username,password,repassword
 */
export function goToRegister(params) {
  return httpUtil.post('user/register', params);
}

/**
 * 登录
 * @params username,password
 */
export function goToLogin(params) {
  return httpUtil.post('user/login', params);
}

// 退出登录
export function goToLogout() {
  return httpUtil.get('user/logout/json');
}

// 体系
export function getSystemData() {
  return httpUtil.get('tree/json');
}

// 获取公众号Tabs列表
export function getWxArticleTabs() {
  return httpUtil.get('wxarticle/chapters/json');
}

/**
 * 查看某个公众号历史数据
 * @param id 公众号ID
 * @param page 公众号页码
 */
export function getWxArticleList(id, page) {
  return httpUtil.get(`wxarticle/list/${id}/${page}/json`);
}

// 获取导航数据
export function getGuideData() {
  return httpUtil.get('navi/json');
}

// 获取导航数据
export function getProjectTree() {
  return httpUtil.get('project/tree/json');
}

// 常用网站
export function getOftenUsedWebsites() {
  return httpUtil.get('friend/json');
}

// 搜索热词
export function getSearchHotKey() {
  return httpUtil.get('hotkey/json');
}

/**
 * 根据关键词搜索文章
 * @param k 关键词
 * @param page 文章页码
 */
export function getSearchArticle(k, page = 0) {
  return httpUtil.post(`article/query/${page}/json`, {k});
}

// 我收藏的文章列表
export function getCollectArticleList(page = 0) {
  return httpUtil.get(`lg/collect/list/${page}/json`);
}

// 获取个人积分获取列表，需要登录后访问
export function getMyCoinList(page = 1) {
  return httpUtil.get(`lg/coin/list/${page}/json`);
}

export function getMyCoinInfo() {
  return httpUtil.get('lg/coin/userinfo/json');
}
