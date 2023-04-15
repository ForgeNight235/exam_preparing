import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Root from "../pages/Root";
import SinglePage from "../pages/SinglePage";
import sortBy from "../pages/sortBy";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <HomePage/>,
            },
            {
                path: '/articles/:id',
                element: <SinglePage/>,
            },
            {
                path: '/sortBy',
                element: <sortBy />
            }
        ]
    }
]);

export default router;