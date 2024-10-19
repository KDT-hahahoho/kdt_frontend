import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <ul>
          <li>
            <Link to="/users/login">로그인</Link>
          </li>
          <li>
            <Link to="/users/signup">회원가입</Link>
          </li>
          <li>
            <Link to="/counseling">심리 상담</Link>
          </li>
          <li>
            <Link to="/emotion/record">감정 기록</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
