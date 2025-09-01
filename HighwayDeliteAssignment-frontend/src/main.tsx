import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import {SignupPage , SigninPage} from "./pages/index.ts"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "signin",
        element: <SigninPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
