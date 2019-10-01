/**
 * Created by hjs on 2019-09-22
 */
import actionTypes from '../actions/actionType';

const initialStore = {
  systemData: [],
};

const user = (state = initialStore, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TO_SYSTEM_DATA:
      return {
        ...state,
        systemData: action.systemData,
      };
    default:
      return state;
  }
};

export default user;
