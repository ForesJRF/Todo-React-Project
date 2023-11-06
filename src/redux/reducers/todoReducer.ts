import { AnyAction } from "redux";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ACTION_TYPES from "../actions/action-types";
import { FILTER_ACTIVE_TYPES } from "../../shared/constants/filterActiveTypes";
import { SORT_TYPES } from "../../shared/constants/sortTypes";
import ITask from "../../shared/types/ITask";
import { getTasks, postTask, deleteTask, editTask } from "../../api/tasksApi";

interface State {
  todoList: ITask[];
  searchVal: string;
  filterVal: null | keyof typeof FILTER_ACTIVE_TYPES;
  sortByAlpVal: null | keyof typeof SORT_TYPES;
  isLoading: boolean;
}

const initialState: State = {
  todoList: [],
  searchVal: "",
  filterVal: null,
  sortByAlpVal: null,
  isLoading: false,
};

export const fetchTasks = createAsyncThunk("todo/getTasks", async () => {
  const response = await getTasks();
  return response.data;
});

export const fetchPostTask = createAsyncThunk(
  "todo/postTask",
  async (task: ITask) => {
    const response = await postTask(task);
    return response.data;
  }
);

export const fetchDeleteTask = createAsyncThunk(
  "todo/deleteTask",
  async (id: string) => {
    const response = await deleteTask(id);
    return response.data;
  }
);

export const fetchEditTask = createAsyncThunk(
  "todo/editTask",
  async (data: { task: Partial<ITask>; id: string }) => {
    const { task, id } = data;

    const response = await editTask(task, id);
    return response.data;
  }
);

const handleSetTasks = (state: any, action: PayloadAction<ITask[]>) => {
  state.todoList = action.payload;
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      state.todoList.push(action.payload);
    },
    editTaskText: (state, action: PayloadAction<ITask>) => {
      const { text, id } = action.payload;

      state.todoList = state.todoList.map((task) => {
        if (task.id !== id) return task;

        return {
          ...task,
          text,
          id,
        };
      });
    },
    setTasks: handleSetTasks,
    clearTasks: (state) => {
      state.todoList = [];
    },
    changeTaskChecked: (state, action: PayloadAction<string>) => {
      state.todoList = state.todoList.map((task) => {
        if (task.id !== action.payload) return task;

        return {
          ...task,
          isDone: !task.isDone,
        };
      });
    },
    changeSearchVal: (state, action: PayloadAction<string>) => {
      state.searchVal = action.payload;
    },
    changeFilterVal: (
      state,
      action: PayloadAction<keyof typeof FILTER_ACTIVE_TYPES>
    ) => {
      state.filterVal = action.payload;
      localStorage.setItem('filterVal', action.payload);
    },
    removeChecked: (state) => {
      state.todoList = state.todoList.filter((task) => !task.isDone);
    },
    changeSortByAlpVal: (
      state,
      action: PayloadAction<keyof typeof SORT_TYPES>
    ) => {
      state.sortByAlpVal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      handleSetTasks(state, action);
      state.isLoading = false;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(fetchEditTask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchEditTask.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(fetchEditTask.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(fetchDeleteTask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDeleteTask.fulfilled, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default todoSlice.reducer;

export const {
  addTask,
  changeSortByAlpVal,
  editTaskText,
  setTasks,
  clearTasks,
  changeTaskChecked,
  changeSearchVal,
  changeFilterVal,
  removeChecked,
} = todoSlice.actions;
