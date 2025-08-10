import About from "@/views/about";
import Layout from "@/views/Layout";
import Type from "@/views/type";
import Words from "@/views/words";
import { Navigate, RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/type" replace />,
      },
      {
        path: "type",
        element: <Type />,
      },
      {
        path: "words",
        element: <Words />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
];

export default routes;
