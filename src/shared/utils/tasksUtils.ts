import { SORT_TYPES } from "../constants/sortTypes";
import { FILTER_ACTIVE_TYPES } from "../constants/filterActiveTypes";
import ITask from "../types/ITask";

export const findTaskIndexById = (tasks: ITask[], taskId: string) =>
  tasks.findIndex(({ id }) => taskId === id);

const onAlpSort = (tasks: ITask[]) => {
  const tasksClone = [...tasks];
  tasksClone.sort((x, y) => (x.text > y.text ? 1 : -1));

  return tasksClone;
};

const onAltAlpSort = (tasks: ITask[]) => {
  const tasksClone = [...tasks];
  tasksClone.sort((x, y) => (x.text < y.text ? 1 : -1));

  return tasksClone;
};

export const sortByAlpVal = (
  tasks: ITask[],
  sortType: keyof typeof SORT_TYPES | null
) => {
  switch (sortType) {
    case SORT_TYPES.BY_ALPHABET:
      return onAlpSort(tasks);

    case SORT_TYPES.BY_ALPHABET_REVERSE:
      return onAltAlpSort(tasks);

    default:
      return tasks;
  }
};

export const filterByActiveType = (
  tasks: ITask[],
  activeType: null | keyof typeof FILTER_ACTIVE_TYPES
) => {
  switch (activeType) {
    case FILTER_ACTIVE_TYPES.ALL:
      return tasks;

    case FILTER_ACTIVE_TYPES.ACTIVE:
      return tasks.filter((task) => !task.isDone);

    case FILTER_ACTIVE_TYPES.UNACTIVE:
      return tasks.filter((task) => task.isDone);
    default:
      return tasks;
  }
};

export const searchTask = (tasks: ITask[], val: string) => {
  // put to patch
  console.log(tasks, 'tasks')
  return tasks.filter(
    (task) => task.text.toLowerCase().search(val.toLowerCase()) !== -1
  );
};

export const getDoneTasksAmount = (tasks: ITask[]) =>
  tasks.reduce((sum, task) => {
    if (task.isDone) sum += 1;
    return sum;
  }, 0);

export const findTaskById = (tasks: ITask[], id: string) =>
  tasks.find((task) => task.id === id);
