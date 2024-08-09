import todoReducer from '@/redux/slice/todo';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  todoList: todoReducer,
});
