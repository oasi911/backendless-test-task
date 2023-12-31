import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Tabs from "./components/Tabs";
import { loader } from "./components/Tabs";

const lazyLoad = (Component) => (props) =>
  (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );

const DummyTable = lazyLoad(React.lazy(() => import("./tabs/dummyTable")));
const DummyChart = lazyLoad(React.lazy(() => import("./tabs/dummyChart")));
const DummyList = lazyLoad(React.lazy(() => import("./tabs/dummyList")));

const router = createHashRouter([
  {
    path: `${process.env.PUBLIC_URL}/`,
    loader: loader,
    element: <Tabs />,
    children: [
      {
        path: `${process.env.PUBLIC_URL}/dummyTable`,
        element: <DummyTable />,
      },
      {
        path: `${process.env.PUBLIC_URL}/dummyChart`,
        element: <DummyChart />,
      },
      {
        path: `${process.env.PUBLIC_URL}/dummyList`,
        element: <DummyList />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
