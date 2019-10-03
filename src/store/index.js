/**
 * Created by hjs on 2019-09-17
 */
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const index = createStore(rootReducer, applyMiddleware(thunk));
export default index;
