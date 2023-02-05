import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home';
import Messagerie from './pages/Messagerie';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Profil from './pages/Profil';
import reportWebVitals from './reportWebVitals';
import { createHashRouter, RouterProvider } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap";

const router = createHashRouter([
  {
    path: "/gamoo",
    element: <Home/>,
  },
  {
    path: "/messagerie",
    element: <Messagerie/>,
  },
  {
    path: "connexion",
    element: <Connexion/>,
  },
  {
    path: "/inscription",
    element: <Inscription/>,
  },
  {
    path: "/profil/:id",
    element: <Profil/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
