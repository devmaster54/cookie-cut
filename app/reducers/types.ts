import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export type TaskType = {
  id: string;
  checked: boolean;
  site: string;
  status: string; // idle, bake, done
  proxy: string;
  proxy_list: Array<string>;
  cookies: number;
  timer: number;
};
export type CutterStateType = {
  delay: number;
  tasks: Array<TaskType>;
  cookies: object;
};

export type StateType = {
  cutter: CutterStateType;
};

export type GetState = () => StateType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<CutterStateType, Action<string>>;
