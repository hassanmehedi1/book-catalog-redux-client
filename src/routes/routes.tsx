import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import NotFound from "../components/NotFound";
import AllBooks from "../pages/AllBooks";
import BookDetails from "../pages/BookDetails";
import AddNewBook from "../pages/AddNewBook";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
