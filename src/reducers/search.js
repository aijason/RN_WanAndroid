/**
 * Created by hjs on 2019-09-27
 */
import actionTypes from '../actions/actionType';

const initialState = {
  page: 1, // 第一页page为0
  hotKey: [], // 搜索热词
  articleData: {},
  dataSource: [], // 文章列表数据源
  isRenderFooter: false, // 是否渲染列表footer
  isFullData: false, // 是否加载完全部数据
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_HOT_KEY:
      return {
        ...state,
        hotKey: action.hotKey,
      };
    case actionTypes.FETCH_SEARCH_ARTICLE:
      return {
        ...state,
        page: 1,
        articleData: action.articleData,
        dataSource: action.articleData.datas,
        isRenderFooter: !!action.articleData.total, // 只有total为0是不渲染footer
        isFullData: action.articleData.curPage === action.articleData.pageCount,
      };
    case actionTypes.FETCH_SEARCH_ARTICLE_MORE:
      return {
        ...state,
        page: ++state.page,
        dataSource: state.dataSource.concat(action.articleData.datas),
        isRenderFooter: true,
        isFullData: !action.articleData.datas.length,
      };
    case actionTypes.CLEAR_SEARCH_ARTICLE:
      return {
        ...state,
        page: 1,
        articleData: {},
        dataSource: [],
        isRenderFooter: false,
        isFullData: false,
      };
    case actionTypes.FETCH_SEARCH_ARTICLE_ADD_COLLECT:
      let addCollectDataSource = [...state.dataSource];
      addCollectDataSource[action.index].collect = true;
      return {
        ...state,
        dataSource: addCollectDataSource,
      };
    case actionTypes.FETCH_SEARCH_ARTICLE_CANCEL_COLLECT:
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

export default search;
