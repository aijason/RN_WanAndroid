/**
 * Created by hjs on 2019-09-22
 */
import actionTypes from '../actions/actionType';

const initialStore = {
  projectTabs: [],
};

const wxArticle = (state = initialStore, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECT_TABS:
      return {
        ...state,
        projectTabs: action.projectTabs,
      };
    default:
      return state;
  }
};

export default wxArticle;
