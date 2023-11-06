import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "redux/store";
import ITask from "shared/types/ITask";
import TodoActions from "redux/actions/todoActions";
import TodoSelectors from "../redux/selectors/todoSelectors";
import { findTaskById } from "../shared/utils/tasksUtils";
import { getTask } from "api/tasksApi";
import { fetchEditTask } from "redux/reducers/todoReducer";

const TaskInfoPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const todoList = useAppSelector(TodoSelectors.selectTodoList);

  const [task, setTask] = useState<null | ITask>(null);
  const [isAddingDesc, setIsAddingDesc] = useState(false);
  const [descVal, setDescVal] = useState("");

  const fetchTask = async () => {
    try {
      const data = (await getTask(taskId as string)).data;
      setTask(data);
    } catch {
      console.log("error while getting task");
      navigate("/");
    }
  };

  useEffect(() => {
    if (!taskId) return navigate("/");

    fetchTask();
  }, []);

  const onAddDescClick = () => setIsAddingDesc(true);

  const onDescValChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescVal(e.target.value);
  };

  const saveDesc = async () => {
    try {
      const data = await dispatch(
        fetchEditTask({
          task: {
            description: descVal,
          },
          id: taskId as string,
        })
      );

      setTask(data.payload);
    } catch {
      console.log("error");
    } finally {
      setIsAddingDesc(false);
    }
  };

  return (
    <div>
      <h1>{task?.text}</h1>
      {!isAddingDesc &&
        (task?.description ? (
          <p>{task.description}</p>
        ) : (
          <button onClick={onAddDescClick}>Add description</button>
        ))}

      {isAddingDesc && (
        <>
          <textarea
            onChange={onDescValChange}
            value={descVal}
            placeholder="Description"
          />
          <button onClick={saveDesc}>Save</button>
        </>
      )}
    </div>
  );
};

export default TaskInfoPage;
