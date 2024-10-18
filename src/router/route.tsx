import { Navigate, createBrowserRouter } from 'react-router-dom';

import Layout from '@components/layout/Layout';
import Home from '@pages/Home/Home';
import LoginPage from '@pages/User/login/LoginPage';
import SignUpPage from '@pages/User/signup/SignUpPage';
import Counseling from '@pages/counseling/Counseling';
import Emotion from '@pages/emotion/Emotion';
import EmotionMessage from '@pages/emotion/message/EmotionMessage';
import EmotionRecordPage from '@pages/emotion/record/EmotionRecordPage';

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
      {
        path: '/counseling',
        element: <Counseling />,
      },
      {
        path: 'emotion',
        element: <Emotion />,
        children: [
          {
            index: true,
            element: <Navigate to="record" />,
          },
          {
            path: 'record',
            element: <EmotionRecordPage />,
          },
          {
            path: 'message',
            element: <EmotionMessage />,
          },
        ],
      },
    ],
  },
]);

export default router;
