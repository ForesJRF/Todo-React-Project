import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "redux/store";
import { SORT_TYPES } from "../../constants/sortTypes";
import { FILTER_ACTIVE_TYPES } from "../../constants/filterActiveTypes";
import Task from "../Task/Task";
import ITask from "shared/types/ITask";
import TasksCounter from "../TasksCounter/TasksCounter";
import TodoSelectors from "../../../redux/selectors/todoSelectors";
import TodoActions from "../../../redux/actions/todoActions";
import {
  addTask,
  removeChecked,
  clearTasks,
  changeFilterVal,
  changeSortByAlpVal,
  changeSearchVal,
  fetchTasks,
  fetchPostTask,
} from "redux/reducers/todoReducer";

import styles from "./styles.module.scss";

const Todo = () => {
  const dispatch = useAppDispatch();

  const [addValue, setAddValue] = useState("");
  const tasks = useAppSelector(TodoSelectors.selectTasksAfterAllFiltering);
  const searchVal = useAppSelector(TodoSelectors.selectSearchVal);
  const isLoading = useAppSelector(TodoSelectors.selectTodoIsLoading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const onInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddValue(e.target.value);
  };

  const onAddTask = async () => {
    if (!addValue.replace(/\s/g, "")) return;

    const id = uuidv4();

    const newTask = {
      id,
      text: addValue,
      isDone: false,
      description: null,
    };

    await dispatch(fetchPostTask(newTask));
    dispatch(fetchTasks());

    setAddValue("");
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") onAddTask();
  };

  return (
    <div className={styles.todo}>
      <h1>TODO List</h1>
      <hr />
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          onKeyPress={onEnterPress}
          onInput={onInputValue}
          value={addValue}
          placeholder="Название записи"
          type="text"
        />
        <button onClick={onAddTask} className={styles.addButton}>
          Add
        </button>
      </div>
      <input
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(changeSearchVal(e.target.value))
        }
        value={searchVal}
        type="text"
      />
      <button
        onClick={() => dispatch(changeSortByAlpVal(SORT_TYPES.BY_ALPHABET))}
        className={styles.sort}
      >
        Sort (A-Z)
      </button>
      <button
        onClick={() =>
          dispatch(changeSortByAlpVal(SORT_TYPES.BY_ALPHABET_REVERSE))
        }
        className={styles.sort}
      >
        Sort (Z-A)
      </button>
      <div>
        <button
          onClick={() => dispatch(changeFilterVal(FILTER_ACTIVE_TYPES.ALL))}
        >
          All
        </button>
        <button
          onClick={() => dispatch(changeFilterVal(FILTER_ACTIVE_TYPES.ACTIVE))}
        >
          Active
        </button>
        <button
          onClick={() =>
            dispatch(changeFilterVal(FILTER_ACTIVE_TYPES.UNACTIVE))
          }
        >
          Done
        </button>
      </div>
      {isLoading ? (
        "loading..."
      ) : (
        <ul className={styles.content}>
          {tasks.map((task: any) => (
            <Task key={task.id} task={task} />
          ))}
        </ul>
      )}
      <div>
        <TasksCounter />
        {/* <button onClick={removeCheckedTasks}>Remove checked</button>
        <button onClick={clearAllTasks}>Clear tasks</button> */}
      </div>
    </div>
  );
};

export default Todo;
