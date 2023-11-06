import ACTION_TYPES from "./action-types";
import ITask from "shared/types/ITask";
import { FILTER_ACTIVE_TYPES } from "shared/constants/filterActiveTypes";
import { SORT_TYPES } from "shared/constants/sortTypes";

const addTask = (payload: ITask) => ({
  type: ACTION_TYPES.ADD_TASK,
  payload,
});

const setTasks = (payload: ITask[]) => ({
  type: ACTION_TYPES.SET_TASKS,
  payload,
});

const deleteTask = (payload: string) => ({
  type: ACTION_TYPES.DELETE_TASK,
  payload,
});

const editTaskText = (payload: ITask) => ({
  type: ACTION_TYPES.EDIT_TASK_TEXT,
  payload,
});

const editTask = (payload: ITask) => ({
  type: ACTION_TYPES.EDIT_TASK,
  payload,
});

const clearTasks = () => ({
  type: ACTION_TYPES.CLEAR_TASKS,
});

const changeTaskChecked = (payload: string) => ({
  type: ACTION_TYPES.CHANGE_TASK_CHECKED,
  payload,
});

const changeSearchVal = (payload: string) => ({
  type: ACTION_TYPES.CHANGE_SEARCH_VAL,
  payload,
});

const changeFilterVal = (payload: keyof typeof FILTER_ACTIVE_TYPES) => ({
  type: ACTION_TYPES.CHANGE_FILTER_VAL,
  payload,
});

const removeChecked = () => ({
  type: ACTION_TYPES.REMOVE_CHECKED,
});

const changeSortByAlpVal = (payload: keyof typeof SORT_TYPES) => ({
  type: ACTION_TYPES.CHANGE_SORT_BY_ALP_VAL,
  payload,
});

const TodoActions = {
  addTask,
  deleteTask,
  editTaskText,
  editTask,
  clearTasks,
  changeTaskChecked,
  changeSearchVal,
  changeFilterVal,
  removeChecked,
  changeSortByAlpVal,
  setTasks,
};

export default TodoActions;
