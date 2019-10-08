/**
 * Created by hjs on 2019-09-17
 */
import {combineReducers} from 'redux';
import home from './home';
import user from './user';
import system from './system';
import wxArticle from './wxArticle';
import guide from './guide';
import project from './project';
import search from './search';
import collect from './collect';
import coin from './coin';

export default combineReducers({
  home,
  user,
  system,
  wxArticle,
  guide,
  project,
  search,
  collect,
  coin,
});
