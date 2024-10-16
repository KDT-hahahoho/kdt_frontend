import { Navigate, createBrowserRouter } from 'react-router-dom';

import SignUpPage from '@pages/User/signup/SignUpPage';
import LoginPage from '@pages/User/login/LoginPage';
import Layout from '@components/layout/Layout';
import Home from '@pages/Home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'users/login',
        element: <LoginPage />,
      },
      {
        path: 'users/signup',
        element: <SignUpPage />,
      },
    ],
  },
]);

export default router;
