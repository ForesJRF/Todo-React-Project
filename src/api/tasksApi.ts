import axios from "axios";
import ITask from "../shared/types/ITask";

const BASE_URL = "http://localhost:3000";

export const getTasks = () => axios.get(`${BASE_URL}/tasks`);

export const getTask = (id: string) => axios.get(`${BASE_URL}/tasks/${id}`);

export const postTask = (task: ITask) => axios.post(`${BASE_URL}/tasks`, task);

export const editTask = (task: Partial<ITask>, id: string) =>
  axios.patch(`${BASE_URL}/tasks/${id}`, task);

export const deleteTask = (id: string) =>
  axios.delete(`${BASE_URL}/tasks/${id}`);
