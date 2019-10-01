/**
 * Created by huangjunsheng on 2019-09-25
 */
import actionTypes from '../actions/actionType';

const initialStore = {
  selectIndex: 0, // 左侧选中的索引值
  guideData: [], // 导航数据
};

const guide = (state = initialStore, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GUIDE_DATA:
      return {
        ...state,
        guideData: action.guideData,
      };
    case actionTypes.UPDATE_SELECT_INDEX:
      return {
        ...state,
        selectIndex: action.selectIndex,
      };
    default:
      return state;
  }
};

export default guide;
