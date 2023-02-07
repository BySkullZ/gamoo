import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home';
import Messagerie from './pages/Messagerie';
import Connexion from './pages/Connexion';
import MdpOublie from './pages/MdpOublie';
import MailOublie from './pages/MailOublie';
import ReinitialiserMdp from './pages/ReinitialiserMdp';
import Inscription from './pages/Inscription';
import ConfirmerInscription from './pages/ConfirmerInscription';
import Profil from './pages/Profil';
import Appel from './pages/Appel';
import reportWebVitals from './reportWebVitals';
import { createHashRouter, RouterProvider } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap";

const router = createHashRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/messagerie",
    element: <Messagerie/>,
  },
  {
    path: "/connexion",
    element: <Connexion/>,
  },
  {
    path: "/mdp-oublie",
    element: <MdpOublie/>,
  },
  {
    path: "/mail-oublie",
    element: <MailOublie/>,
  },
  {
    path: "/reinitialiser-mdp/:token",
    element: <ReinitialiserMdp/>,
  },
  {
    path: "/inscription",
    element: <Inscription/>,
  },
  {
    path: "/confirmer-inscription/:token",
    element: <ConfirmerInscription/>,
  },
  {
    path: "/profil/:id",
    element: <Profil/>,
  },
  {
    path: "/appel",
    element: <Appel/>,
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
