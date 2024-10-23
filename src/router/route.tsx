import { Navigate, createBrowserRouter } from 'react-router-dom';

import Layout from '@components/layout/Layout';
import Home from '@pages/Home/Home';
import LoginPage from '@pages/User/login/LoginPage';
import SignUpPage from '@pages/User/signup/SignUpPage';
import Counseling from '@pages/counseling/Counseling';
import CounselingList from '@pages/counseling/CounselingList';
import Testing from '@pages/scale/Testing';
import EmotionMessage from '@pages/emotion/message/EmotionMessage';
import EmotionRecordPage from '@pages/emotion/record/EmotionRecordPage';
import WelcomePage from '@pages/User/welcome/WelcomePage';
import EmotionMission from '@pages/emotion/mission/EmotionMission';

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
        path: 'users/welcome',
        element: <WelcomePage />,
      },
      {
        path: 'counseling',
        element: <Counseling />,
      },
      {
        path: 'counseling/:id',
        element: <Counseling />,
      },
      {
        path: 'counseling/list',
        element: <CounselingList />,
      },
      {
        path: '/scale/testing',
        element: <Testing />,
      },
      {
        path: 'emotion/record',
        element: <EmotionRecordPage />,
      },
      {
        path: 'emotion/message',
        element: <EmotionMessage />,
      },
      {
        path: 'emotion/mission',
        element: <EmotionMission />,
      },
    ],
  },
]);

export default router;
