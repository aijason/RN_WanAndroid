/**
 * Created by hjs on 2019-09-27
 */
import actionTypes from '../actions/actionType';

const initialState = {
  page: 1, // 第一页page为0
  collectData: {},
  dataSource: [], // 文章列表数据源
  isRenderFooter: false, // 是否渲染列表footer
  isFullData: false, // 是否加载完全部数据
};

const collect = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COLLECT_ARTICLE:
      return {
        ...state,
        page: 1,
        collectData: action.collectData,
        dataSource: action.collectData.datas,
        isRenderFooter: !!action.collectData.total, // 只有total为0是不渲染footer
        isFullData: action.collectData.curPage === action.collectData.pageCount,
      };
    case actionTypes.FETCH_COLLECT_ARTICLE_MORE:
      return {
        ...state,
        page: ++state.page,
        dataSource: state.dataSource.concat(action.collectData.datas),
        isRenderFooter: true,
        isFullData: !action.collectData.datas.length,
      };
    case actionTypes.FETCH_MYCOLLECT_ADD_COLLECT:
      let addCollectDataSource = [...state.dataSource];
      addCollectDataSource[action.index].collect = true;
      return {
        ...state,
        dataSource: addCollectDataSource,
      };
    case actionTypes.FETCH_MYCOLLECT_CANCEL_COLLECT:
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

export default collect;
