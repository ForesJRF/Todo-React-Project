import { useEffect } from "react";
import { AppDispatch, useAppDispatch } from "redux/store";
import Router from "./Router";
import { changeFilterVal } from "redux/reducers/todoReducer";

export default function App() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const filterVal = localStorage.getItem('filterVal');

    if (filterVal) {
      dispatch(changeFilterVal(filterVal as any))
    }
  }, [])

  return <Router />;
}
