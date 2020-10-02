// import { Action } from 'redux';
import {
  UPDATE_TASKS,
  SET_DELAY,
  SET_TASK_CHECKED,
  ADD_NEW_COOKIE,
  UPDATE_TASK_STATUS,
  DELETE_COOKIES,
  UPDATE_PROXY
} from '../actions/cutter';
import { CutterStateType } from './types';
import { sites } from '../constants/cookie.json';

const initCutter = {
  delay: 0,
  tasks: [],
  cookies: { footlocker: [], eastbay: [] }
};

export default function cutter(state = initCutter, action) {
  switch (action.type) {
    case UPDATE_TASKS:
      return { ...state, tasks: action.tasks };
    case SET_DELAY:
      return { ...state, delay: action.delay };
    case SET_TASK_CHECKED:
      const tasks = state.tasks.map((item, key) => {
        return key === action.key ? { ...item, checked: !item.checked } : item;
      });
      return { ...state, tasks };
    case ADD_NEW_COOKIE:
      const cookies = state.cookies;
      const item = state.tasks.find(item => item.id === action.id);
      if (!item) return { ...state };
      if (item.status === 'idle') return { ...state };
      const added_cookie_tasks = state.tasks.map((item, key) => {
        return item.id === action.id
          ? { ...item, cookies: item.cookies + 1 }
          : item;
      });
      if (action.site === 'footlocker') {
        return {
          ...state,
          tasks: added_cookie_tasks,
          cookies: {
            ...cookies,
            footlocker: [...cookies.footlocker, action.cookie]
          }
        };
      } else {
        return {
          ...state,
          tasks: added_cookie_tasks,
          cookies: { ...cookies, eastbay: [...cookies.eastbay, action.cookie] }
        };
      }
    case UPDATE_TASK_STATUS:
      const status_tasks = state.tasks.map((item, key) => {
        return item.id === action.id && item.status !== 'idle'
          ? { ...item, status: action.status }
          : item;
      });
      return { ...state, tasks: status_tasks };
    case DELETE_COOKIES:
      return { ...state, cookies: { footlocker: [], eastbay: [] } };
    case UPDATE_PROXY:
      const proxy_updated_tasks = state.tasks.map((item, key) => {
        return item.id === action.id
          ? {
              ...item,
              proxy:
                item.proxy_list[
                  parseInt(Math.random() * 10000) % item.proxy_list.length
                ]
            }
          : item;
      });
      return { ...state, tasks: proxy_updated_tasks };
    default:
      // const cookies = {};
      // sites.map(item => (cookies[item] = []));
      return { ...state };
  }
}
