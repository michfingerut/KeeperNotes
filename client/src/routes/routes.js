//External modules
import React from 'react';

//Internal modules
import KeeperMainPage from '../views/KeeperMainPage.jsx';
import LogInPage from '../views/LogInPage.jsx';

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
