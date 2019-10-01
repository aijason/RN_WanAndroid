/**
 * Created by hjs on 2019-09-17
 */
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// import {persistStore, persistReducer} from 'redux-persist';
// import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from '../reducers';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: ['user', 'home'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default function configureStore() {
//   const store = createStore(persistedReducer, applyMiddleware(thunk));
//   let persistor = persistStore(store);
//   return {store, persistor};
// }

const index = createStore(rootReducer, applyMiddleware(thunk));
export default index;
