import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // App.tsx와 같은 디렉토리에 있을 경우

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
