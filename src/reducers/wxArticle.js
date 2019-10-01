/**
 * Created by hjs on 2019-09-22
 */
import actionTypes from '../actions/actionType';

const initialStore = {
  articleTabs: [],
};

const wxArticle = (state = initialStore, action) => {
  switch (action.type) {
    case actionTypes.FETCH_WX_ARTICLE_TABS:
      return {
        ...state,
        articleTabs: action.articleTabs,
      };
    default:
      return state;
  }
};

export default wxArticle;
