/**
 * Created by hjs on 2019-09-27
 */
import actionTypes from '../actions/actionType';

const initialState = {
  page: 1,
  coinList: {},
  dataSource: [], // 文章列表数据源
  isRenderFooter: false, // 是否渲染列表footer
  isFullData: false, // 是否加载完全部数据
  coinCount: 0, // 总积分
  rank: 0, // 当前排名
};

const coin = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MY_COIN_LIST:
      return {
        ...state,
        page: 1,
        coinList: action.coinList,
        dataSource: action.coinList.datas,
        isRenderFooter: !!action.coinList.total, // 只有total为0是不渲染footer
        isFullData: action.coinList.curPage === action.coinList.pageCount,
      };
    case actionTypes.FETCH_MY_COIN_LIST_MORE:
      return {
        ...state,
        page: ++state.page,
        dataSource: state.dataSource.concat(action.coinList.datas),
        isRenderFooter: true,
        isFullData: !action.coinList.datas.length,
      };
    case actionTypes.FETCH_MY_COIN_INFO:
      return {
        ...state,
        coinCount: action.coinInfo.coinCount,
        rank: action.coinInfo.rank,
      };
    default:
      return state;
  }
};

export default coin;
