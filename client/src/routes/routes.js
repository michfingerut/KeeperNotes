import KeeperMainPage from '../components/KeeperMainPage.jsx';
import LogInPage from '../components/LogInPage';
import React from 'react';
import { Route } from 'react-router-dom';

const routes = [
  {
    path: '/',
    element: <KeeperMainPage />,
  },
  {
    path: '/login',
    element: <LogInPage />,
  },
];

export default routes;
