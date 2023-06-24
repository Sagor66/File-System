import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Nested from "../pages/Nested";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
    },
    {
      path: 'folders/:id',
      loader: ({ params }) => fetch(`http://localhost:5000/folders/${params.id}`),
      element: <Nested></Nested>
    }

  ]);