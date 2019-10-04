/**
 * Created by hjs on 2019-09-22
 */
import actionTypes from '../actions/actionType';

const initialStore = {
  articleTabs: [],
  isShowLoading: false,
};

const wxArticle = (state = initialStore, action) => {
  switch (action.type) {
    case actionTypes.FETCH_WX_ARTICLE_TABS:
      return {
        ...state,
        articleTabs: action.articleTabs,
      };
    case actionTypes.FETCH_ARTICLE_LOADING:
      return {
        ...state,
        isShowLoading: action.isShowLoading,
      }
    default:
      return state;
  }
};

export default wxArticle;
