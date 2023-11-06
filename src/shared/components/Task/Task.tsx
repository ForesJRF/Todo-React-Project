import { useState } from "react";
import { useAppDispatch } from "redux/store";
import { Link } from "react-router-dom";
import { findTaskIndexById } from "../../utils/tasksUtils";
import TodoActions from "../../../redux/actions/todoActions";
import {
  editTaskText,
  changeTaskChecked,
  fetchDeleteTask,
  fetchEditTask,
  fetchTasks,
} from "redux/reducers/todoReducer";
import ITask from "../../types/ITask";
import styles from "./styles.module.scss";

type Props = {
  task: ITask;
};

const Task = ({ task }: Props) => {
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [changeValue, setChangeValue] = useState(task.text);

  const { text, id } = task;

  const onDeleteTask = async () => {
    await dispatch(fetchDeleteTask(id));
    dispatch(fetchTasks());
  };

  const onChangeTask = () => setIsEditing(true);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeValue(e.target.value);
  };

  const onEditDone = async () => {
    if (!changeValue.replace(/\s/g, "")) return;

    await dispatch(
      fetchEditTask({
        task: {
          text: changeValue,
        },
        id,
      })
    );
    dispatch(fetchTasks());
    setIsEditing(false);
  };

  const onChecked = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await dispatch(
      fetchEditTask({
        task: {
          isDone: e.target.checked,
        },
        id,
      })
    );
    dispatch(fetchTasks());
  };

  return (
    <li>
      {isEditing ? (
        <input
          type="text"
          onInput={onInputChange}
          value={changeValue}
          className={styles.changePoll}
        ></input>
      ) : (
        <div className={styles.firstLine}>
          <input
            type="checkbox"
            onChange={onChecked}
            defaultChecked={task.isDone}
            placeholder={text}
          ></input>
          <Link to={`/task/${id}`}>
            <p
              style={{
                textDecoration: task.isDone ? "line-through" : "none",
              }}
            >
              {text}
            </p>
          </Link>
        </div>
      )}

      {isEditing ? (
        <button onClick={onEditDone} className={styles.change}>
          C
        </button>
      ) : (
        <button onClick={onChangeTask} className={styles.change}>
          S
        </button>
      )}
      <button onClick={onDeleteTask} className={styles.delete}>
        X
      </button>
    </li>
  );
};

export default Task;
