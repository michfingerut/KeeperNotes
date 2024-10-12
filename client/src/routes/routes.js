//External modules
import React from 'react';

//Internal modules
import KeeperMainPage from '../components/KeeperMainPage.jsx';
import LogInPage from '../components/LogInPage';

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
