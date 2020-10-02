import _ from 'lodash';
import { getCookie } from '../apis';
import dayjs from 'dayjs';
import { remote } from 'electron';
import fs from 'fs';
export const UPDATE_TASKS = 'UPDATE_TASKS';
export const SET_DELAY = 'SET_DELAY';
export const SET_TASK_CHECKED = 'SET_TASK_CHECKED';
export const ADD_NEW_COOKIE = 'ADD_NEW_COOKIE';
export const UPDATE_TASK_STATUS = 'UPDATE_TASK_STATUS';
export const DELETE_COOKIES = 'DELETE_COOKIES';
export const UPDATE_PROXY = 'UPDATE_PROXY';

const UpdateTasks = tasks => ({
  type: UPDATE_TASKS,
  tasks
});

const getRandSting = () => {
  const d = new dayjs();
  const str =
    d.millisecond().toString() + (parseInt(Math.random() * 100000) % 100000);
  return str;
};
export const addTask = (site, proxy_list, count) => (dispatch, getState) => {
  const { tasks } = getState().cutter;
  _.times(count, index => {
    const idstr = getRandSting() + index;
    tasks.push({
      id: idstr,
      checked: false,
      site,
      status: 'idle',
      proxy: '',
      proxy_list,
      cookies: 0,
      timer: -1
    });
  });

  dispatch(UpdateTasks(tasks));
};

export const removeTasks = () => (dispatch, getState) => {
  const { tasks } = getState().cutter;
  tasks.map((item, key) => {
    if (item.checked && item.status !== 'idle') {
      clearInterval(item.timer);
    }
  });
  const newTasks = tasks.filter(item => !item.checked);
  dispatch(UpdateTasks(newTasks));
};

export const setDelay = delay => {
  return {
    type: SET_DELAY,
    delay
  };
};

export const setTaskChecked = (key, checked) => {
  return {
    type: SET_TASK_CHECKED,
    key,
    checked
  };
};

export const updateStatus = () => (dispatch, getState) => {};

const UpdateTaskStatus = (id, status, site) => {
  return {
    type: UPDATE_TASK_STATUS,
    status,
    id
  };
};

const AddNewCookie = (id, site, cookie) => {
  return {
    type: ADD_NEW_COOKIE,
    cookie,
    site,
    id
  };
};
const UpdateProxy = id => {
  return {
    type: UPDATE_PROXY,
    id
  };
};
export const startTasks = () => (dispatch, getState) => {
  const { tasks, delay } = getState().cutter;
  if (delay === 0) return;
  const newTasks = tasks.map(item => {
    if (item.checked && item.status === 'idle') {
      const timer = setInterval(async () => {
        if (item.proxy_list.length > 0) dispatch(UpdateProxy(item.id));
        dispatch(UpdateTaskStatus(item.id, 'bake'));
        const { tasks } = getState().cutter;
        const curItem = tasks.find(it => it.id === item.id);
        const cookie = await getCookie(item.site, curItem.proxy);
        dispatch(AddNewCookie(item.id, item.site, cookie));
        dispatch(UpdateTaskStatus(item.id, 'done'));
      }, delay * 1000);
      return { ...item, timer, status: 'bake' };
    } else {
      return item;
    }
  });
  dispatch(UpdateTasks(newTasks));
};

export const deleteCookies = () => {
  return {
    type: DELETE_COOKIES
  };
};

export const stopTasks = () => (dispatch, getState) => {
  const { tasks } = getState().cutter;
  const newTasks = tasks.map(item => {
    if (item.checked && item.status !== 'idle') {
      clearInterval(item.timer);
      return { ...item, timer: -1, status: 'idle' };
    } else {
      return item;
    }
  });
  dispatch(UpdateTasks(newTasks));
};

export const exportCookies = url => (dispatch, getState) => {
  const { cookies } = getState().cutter;
  const dialog = remote.dialog;
  const WIN = remote.getCurrentWindow();
  let options = {
    title: 'Save',
    buttonLabel: 'Save',
    filters: [{ name: 'Json', extensions: ['json'] }]
  };
  const filename = dialog.showSaveDialogSync(options);
  console.log(filename);
  fs.writeFile(filename, JSON.stringify(cookies), function(err) {
    if (err) throw err;
    console.log(`File saved as ${filename}`);
  });
};
