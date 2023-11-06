import TodoSelectors from "../../../redux/selectors/todoSelectors";
import { useAppSelector } from "redux/store";
import styles from "./styles.module.scss";

const TasksCounter = () => {
  const doneTasksAmount = useAppSelector(TodoSelectors.selectDoneTasksAmount);
  const tasksAmount = useAppSelector(TodoSelectors.selectTasksAmount);

  const donePercentage = (doneTasksAmount / tasksAmount || 0) * 100;

  return (
    <div className={styles.taskCounter}>
      {doneTasksAmount}/{tasksAmount}
      <span
        style={{
          width: `${donePercentage}%`,
        }}
        className={styles.bg}
      ></span>
    </div>
  );
};

export default TasksCounter;
