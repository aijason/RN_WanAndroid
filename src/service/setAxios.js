/**
 * Created by hjs on 2019-09-17
 */
import axios from 'axios';
import {get} from 'lodash';
import qs from 'querystring';
import AuthUtil from '../utils/AuthUtil';
const BASE_URL = 'https://www.wanandroid.com/';
const headers = {
  Accept: 'application/json;charset=utf-8',
  'Content-Type': 'multipart/form-data;charset=utf-8',
};

/**
 * 打印请求响应时的关键日志信息
 * @param response 接口响应信息
 */
async function handleShowResponseLog(response) {
  const {config, data, request} = response;
  console.log('response', response);
  const cookie = get(response, 'headers.set-cookie[0]', '');
  if (cookie) {
    await AuthUtil.saveCookie(cookie);
  }
  console.log('请求的url: ', `${config.method}:${request.responseURL}`);
  if (config.method === 'post') {
    console.log('请求的body: ', qs.parse(config.data));
  }
  console.log('返回值: ', data);
}

export function setAxios() {
  axios.defaults.headers = headers;
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.timeout = 6000; // 请求超时时间
  axios.interceptors.request.use(
    async config => {
      const Cookie = await AuthUtil.getCookie();
      if (config.method === 'post') {
        let data = new FormData();
        for (const i in config.data) {
          data.append(i, config.data[i]);
        }
        config.data = data;
      }
      if (config.url !== 'user/login' && Cookie) {
        config.headers = {Cookie};
      }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    },
  );
  axios.interceptors.response.use(
    async response => {
      const {data} = response;
      await handleShowResponseLog(response);
      if (data.errorCode === 0) {
        return Promise.resolve(data);
      }
      return Promise.reject(data.errorMsg || '请求失败');
    },
    err => {
      console.log('err', err);
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.message = '请求错误(400)';
            break;
          case 401:
            err.message = '未授权，请重新登录(401)';
            break;
          case 403:
            err.message = '拒绝访问(403)';
            break;
          case 404:
            err.message = '请求出错(404)';
            break;
          case 408:
            err.message = '请求超时(408)';
            break;
          case 500:
            err.message = '服务器错误(500)';
            break;
          case 501:
            err.message = '服务未实现(501)';
            break;
          case 502:
            err.message = '网络错误(502)';
            break;
          case 503:
            err.message = '服务不可用(503)';
            break;
          case 504:
            err.message = '网络超时(504)';
            break;
          case 505:
            err.message = 'HTTP版本不受支持(505)';
            break;
          default:
            err.message = `连接出错(${err.response.status})!`;
        }
      } else {
        err.message = '连接服务器失败!';
      }
      return Promise.reject(err.message);
    },
  );
}
