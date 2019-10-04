/**
 * Created by hjs on 2019-09-17
 */
import actionTypes from '../actions/actionType';

const initialStore = {
  page: 1, // 第一页page为0
  dataSource: [], // 列表数据源
  homeList: {},
  homeBanner: [], // 首页轮播数据
  isRenderFooter: false, // 是否渲染列表footer
  isFullData: false, // 是否加载完全部数据
  websites: [], // 常用网站数据
};

const home = (state = initialStore, action) => {
  switch (action.type) {
    case actionTypes.FETCH_HOME_BANNER:
      return {
        ...state,
        homeBanner: action.homeBanner,
      };
    case actionTypes.FETCH_HOME_LIST:
      return {
        ...state,
        page: 1,
        homeList: action.homeList,
        dataSource: action.homeList.datas,
        isRenderFooter: !!action.homeList.total, // 只有total为0是不渲染footer
        isFullData: action.homeList.curPage === action.homeList.pageCount, // 数据最后一页显示"已加载全部"
      };
    case actionTypes.FETCH_HOME_LIST_FAILURE:
      return state;
    case actionTypes.FETCH_HOME_LIST_MORE:
      return {
        ...state,
        page: ++state.page,
        dataSource: state.dataSource.concat(action.homeList.datas),
        isRenderFooter: !!action.homeList.total, // 只有total为0是不渲染footer
        isFullData: action.homeList.datas.length === 0,
      };
    case actionTypes.FETCH_OFTEN_USED_WEBSITES:
      return {
        ...state,
        websites: action.websites,
      };
    case actionTypes.FETCH_HOME_ADD_COLLECT:
      let addCollectDataSource = [...state.dataSource];
      addCollectDataSource[action.index].collect = true;
      return {
        ...state,
        dataSource: addCollectDataSource,
      };
    case actionTypes.FETCH_HOME_CANCEL_COLLECT:
      let cancelCollectDataSource = [...state.dataSource];
      cancelCollectDataSource[action.index].collect = false;
      return {
        ...state,
        dataSource: cancelCollectDataSource,
      };
    default:
      return state;
  }
};

export default home;
