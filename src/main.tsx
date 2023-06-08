import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css";


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/Root';
import Login from './routes/auth/Login';
import Register from './routes/auth/register';
import { Root as ChatRootPage } from './routes/chat/Root';
import ChatDetail from './routes/chatDetail/ChatDetail';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "chat",
        element: <ChatRootPage />,
        children: [
          {
            path: "conversation/:id",
            element: <ChatDetail />
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
