import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import ITask from "shared/types/ITask";
import {
  getDoneTasksAmount,
  searchTask,
  filterByActiveType,
  sortByAlpVal,
} from "../../shared/utils/tasksUtils";

const selectState = (state: RootState) => state.todo;

const selectTodoList = createSelector(selectState, (state) => state.todoList);

const selectTodoIsLoading = createSelector(
  selectState,
  (state) => state.isLoading
);

const selectTasksAmount = createSelector(
  selectTodoList,
  (todoList) => todoList.length
);

const selectDoneTasksAmount = createSelector(selectTodoList, (todoList) =>
  getDoneTasksAmount(todoList)
);

const selectSearchVal = createSelector(selectState, (state) => state.searchVal);

const selectFilterVal = createSelector(selectState, (state) => state.filterVal);

const selectSortByAlpVal = createSelector(
  selectState,
  (state) => state.sortByAlpVal
);

const selectTasksAfterAllFiltering = createSelector(
  selectTodoList,
  selectFilterVal,
  selectSearchVal,
  selectSortByAlpVal,
  (todoList, filterVal, searchVal, alpVal) => {
    const filterFuncs = [
      (tasks: ITask[]) => searchTask(tasks, searchVal),
      (tasks: ITask[]) => filterByActiveType(tasks, filterVal),
      (tasks: ITask[]) => sortByAlpVal(tasks, alpVal),
    ];

    return filterFuncs.reduce((tasks, filterFunc) => {
      return filterFunc(tasks);
    }, todoList);
  }
);

const TodoSelectors = {
  selectTodoList,
  selectTasksAmount,
  selectDoneTasksAmount,
  selectSearchVal,
  selectTasksAfterAllFiltering,
  selectTodoIsLoading,
};

export default TodoSelectors;
