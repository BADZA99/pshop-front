
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter( [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/about",
      element: <h1>About</h1>,
    },
  ],
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
