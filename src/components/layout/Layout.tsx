import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <header>
        <h1>Header</h1>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
