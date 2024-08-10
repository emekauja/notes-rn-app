import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectRoot = (state: RootState) => state;
export const getMemoisedTodos = createSelector(
  selectRoot,
  (root) => root.todoList
);

export const getCompletedTodos = createSelector(selectRoot, (root) =>
  root.todoList.filter((todo) => !!todo.completed)
);
