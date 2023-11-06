import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import TaskInfoPage from "./pages/TaskInfoPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />
    },
    {
        path: '/task/:taskId',
        element: <TaskInfoPage />
    }
]);


const Router = () => <RouterProvider router={router} />;

export default Router;